import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClassSchedulerFacade } from '@campuscalendar/dashboard-data-access';
import { GlobalDialogService } from '@campuscalendar/dialog';
import { SchoolFacade } from '@campuscalendar/school';
import {
  Campus,
  ClassSchedulerInfo,
  ClassYear,
} from '@campuscalendar/shared/api-interfaces';
import { UntilDestroy } from '@ngneat/until-destroy';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { DropdownModule } from 'primeng/dropdown';
import {
  DialogService,
  DynamicDialogModule,
  DynamicDialogRef,
} from 'primeng/dynamicdialog';
import { FieldsetModule } from 'primeng/fieldset';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import {
  BehaviorSubject,
  Observable,
  combineLatest,
  filter,
  map,
  of,
  startWith,
  tap,
} from 'rxjs';
import { ClassCardInfoComponent } from '../class-card-info/class-card-info.component';
import { NewClassDialogComponent } from '../new-class-dialog/new-class-dialog.component';

interface CampusYearClass {
  campusName: string;
  classYearClasses: {
    classYearName: string;
    classes: ClassSchedulerInfo[];
  }[];
}

@UntilDestroy()
@Component({
  selector: 'campuscalendar-dashboard-home',
  standalone: true,
  providers: [DialogService],
  imports: [
    CommonModule,
    ToolbarModule,
    ButtonModule,
    ClassCardInfoComponent,
    FieldsetModule,
    DividerModule,
    FormsModule,
    InputTextModule,
    DropdownModule,
    DynamicDialogModule,
    ToastModule,
    ReactiveFormsModule,
  ],
  templateUrl: './dashboard-home.component.html',
  styleUrls: ['./dashboard-home.component.scss'],
})
export class DashboardHomeComponent implements OnInit {
  private dialogService = inject(DialogService);
  private schoolFacade = inject(SchoolFacade);
  private classFacade = inject(ClassSchedulerFacade);

  schoolState$ = this.schoolFacade.schoolState$;
  classState$ = this.classFacade.classState$;

  searchControl = new FormControl();

  newClassDialog: DynamicDialogRef | undefined;

  combinedState$: Observable<CampusYearClass[]> = of([]);

  private selectedCampusSubject = new BehaviorSubject<Campus | undefined>(
    undefined
  );
  private selectedClassSubject = new BehaviorSubject<ClassYear | undefined>(
    undefined
  );

  get selectedCampus$() {
    return this.selectedCampusSubject;
  }

  set selectedCampus(value: Campus | undefined) {
    this.selectedCampusSubject.next(value);
  }

  get selectedClass$() {
    return this.selectedClassSubject;
  }

  set selectedClass(value: ClassYear | undefined) {
    this.selectedClassSubject.next(value);
  }

  ngOnInit() {
    if (this.schoolState$ && this.classState$) {
      this.combinedState$ = combineLatest([
        this.schoolState$,
        this.classState$,
        this.selectedCampus$,
        this.selectedClass$,
        this.searchControl.valueChanges.pipe(startWith(''))
      ]).pipe(
        map(([schools, classes, selectedCampus, selectedClass, searchValue]) => {
          if (!schools.school) return [];

          const filteredClasses = classes.filter(classItem => {
            const matchesCampus = selectedCampus ? classItem.campusId === selectedCampus.id : true;
            const matchesClassYear = selectedClass ? classItem.classYearId === selectedClass.id : true;
            const matchesSearch = classItem.name.toLowerCase().includes(searchValue.toLowerCase());
            return matchesCampus && matchesClassYear && matchesSearch;
          });
          
          const campusClassYearMap = new Map<
            string,
            Map<string, ClassSchedulerInfo[]>
          >();
          filteredClasses.forEach((classItem) => {
            let classYearMap = campusClassYearMap.get(classItem.campusId);
            if (!classYearMap) {
              classYearMap = new Map<string, ClassSchedulerInfo[]>();
              campusClassYearMap.set(classItem.campusId, classYearMap);
            }
            let classList = classYearMap.get(classItem.classYearId);
            if (!classList) {
              classList = [];
              classYearMap.set(classItem.classYearId, classList);
            }
            classList.push(classItem);
          });

          return Array.from(campusClassYearMap).map(
            ([campusId, classYearMap]) => {
              if (!schools.school)
                return { campusName: 'Campus inconnu', classYearClasses: [] };
              const campus = schools.school.campuses.find(
                (c) => c.id === campusId
              );
              const classYearClasses = Array.from(classYearMap).map(
                ([classYearId, classes]) => {
                  if (!schools.school)
                    return { classYearName: 'Année inconnue', classes: [] };
                  const classYear = schools.school.classYears.find(
                    (cy) => cy.id === classYearId
                  );
                  return { classYearName: classYear?.name || '', classes };
                }
              );
              return { campusName: campus?.name || '', classYearClasses };
            }
          );
        }),
        tap((campusYearClass) => {
          console.log('campusYearClass', campusYearClass);
        })
      );
    }
  }

  isFiltered(): boolean {
    const selectedCampus = this.selectedCampus$.getValue();
    const selectedClass = this.selectedClass$.getValue();
    return !!selectedCampus || !!selectedClass;
  }


  closeDialog() {
    this.newClassDialog?.close();
  }

  openNewClassDialog() {
    this.newClassDialog = this.dialogService.open(NewClassDialogComponent, {
      width: '80%',
      height: 'fit-content',

      data: {
        id: '51gF3',
      },
      header: 'Étape de configuration de la classe',
    });
    GlobalDialogService.setCurrentDialog(this.newClassDialog);
  }
}
