import {NgModule} from '@angular/core';
import { FlexLayoutModule} from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatListModule } from '@angular/material/list';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';

@NgModule({
    imports: [
      FlexLayoutModule,
      MatButtonModule,
      MatFormFieldModule,
      MatSidenavModule,
      MatToolbarModule,
      MatIconModule,
      MatInputModule,
      MatTabsModule,
      MatTableModule,
      MatSortModule,
      MatPaginatorModule,
      MatSnackBarModule,
      MatListModule,
    ],
    exports: [
      FlexLayoutModule,
      MatButtonModule,
      MatFormFieldModule,
      MatSidenavModule,
      MatToolbarModule, 
      MatIconModule, 
      MatInputModule,
      MatTabsModule,
      MatTableModule,
      MatSortModule,
      MatPaginatorModule,
      MatSnackBarModule,
      MatListModule,
    ]
  })
  export class MaterialModule {
  
  }