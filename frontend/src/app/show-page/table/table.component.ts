import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild } from '@angular/core';
import {ShowService} from '../show.service';
import {Subscription} from 'rxjs/Subscription';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Show } from '../show.model';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit, OnDestroy, AfterViewInit {
  //shows: Show[];
  examsListSubs: Subscription;
  displayedColumns = ['content_type', 'title', 'director', 'cast', 'country',
                     'date_added', 'release_year', 'rating', 'duration', 'listed_in',
                    'description'];
  dataSource = new MatTableDataSource<Show>()

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private showsApi: ShowService) { }

  ngOnInit(): void {
    this.showsApi.getData()
      .subscribe(res => {      
        this.dataSource.data = res['data']
      })
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  ngOnDestroy() {
  }

  doFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLocaleLowerCase();
  }

}
