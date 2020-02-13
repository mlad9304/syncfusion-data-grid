/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 */

import React, { useRef } from 'react';
import {
  TreeGridComponent,
  ColumnsDirective,
  ColumnDirective,
  Page,
  Inject,
  Edit,
  Toolbar,
  RowDD,
  ContextMenu,
  Sort,
  Resize,
  ExcelExport,
  PdfExport,
} from '@syncfusion/ej2-react-treegrid';
import { getValue, isNullOrUndefined } from '@syncfusion/ej2-base';
import { sampleData } from './data';

export default function HomePage() {
  const toolbarOptions = ['Add', 'Delete', 'Update', 'Cancel'];
  const editSettings = {
    allowEditing: true,
    allowAdding: true,
    allowDeleting: true,
    mode: 'Row',
    newRowPosition: 'Below',
  };
  const contextMenuItems = [
    'AutoFit',
    'AutoFitAll',
    'SortAscending',
    'SortDescending',
    'Edit',
    'Delete',
    'Save',
    'Cancel',
    'PdfExport',
    'ExcelExport',
    'CsvExport',
    'FirstPage',
    'PrevPage',
    'LastPage',
    'NextPage',
    { text: 'Collapse the Row', target: '.e-content', id: 'collapserow' },
    { text: 'Expand the Row', target: '.e-content', id: 'expandrow' },
    { text: 'Collapse All', target: '.e-headercontent', id: 'collapseall' },
    { text: 'Expand All', target: '.e-headercontent', id: 'expandall' },
  ];
  const validationRule = { required: true };
  const validationRule1 = { date: true };
  const validationRule2 = { required: true, number: true };
  const editparams2 = { params: { format: 'n' } };
  const pageSettings = { pageCount: 5 };
  const treegridObj = useRef();

  const contextMenuOpen = args => {
    const elem = args.event.target;
    const row = elem.closest('.e-row');
    const uid = row && row.getAttribute('data-uid');
    const items = document.querySelectorAll('.e-menu-item');
    for (let i = 0; i < items.length; i += 1) {
      const id = items.item(i).getAttribute('id');
      if (
        id === 'collapserow' ||
        id === 'expandrow' ||
        id === 'collapseall' ||
        id === 'expandall'
      )
        items.item(i).setAttribute('style', 'display: none;');
    }
    if (elem.closest('.e-row') || elem.closest('.e-contextmenu')) {
      if (
        isNullOrUndefined(uid) ||
        isNullOrUndefined(
          getValue(
            'hasChildRecords',
            treegridObj.current.grid.getRowObjectFromUID(uid).data,
          ),
        )
      ) {
        // args.cancel = true;
      } else {
        const flag = getValue(
          'expanded',
          treegridObj.current.grid.getRowObjectFromUID(uid).data,
        );
        let val = flag ? 'none' : 'block';
        document
          .querySelectorAll('li#expandrow')[0]
          .setAttribute('style', `display: ${val};`);
        val = !flag ? 'none' : 'block';
        document
          .querySelectorAll('li#collapserow')[0]
          .setAttribute('style', `display: ${val};`);
      }
    } else {
      const len = treegridObj.current.element.querySelectorAll(
        '.e-treegridexpand',
      ).length;
      if (len !== 0) {
        document
          .querySelectorAll('li#collapseall')[0]
          .setAttribute('style', 'display: block;');
      } else {
        document
          .querySelectorAll('li#expandall')[0]
          .setAttribute('style', 'display: block;');
      }
    }
  };

  const contextMenuClick = args => {
    if (args.item.id === 'collapserow') {
      treegridObj.current.collapseRow(
        treegridObj.current.getSelectedRows()[0],
        treegridObj.current.getSelectedRecords()[0],
      );
    } else if (args.item.id === 'expandrow') {
      treegridObj.current.expandRow(
        treegridObj.current.getSelectedRows()[0],
        treegridObj.current.getSelectedRecords()[0],
      );
    } else if (args.item.id === 'collapseall') {
      treegridObj.current.collapseAll();
    } else if (args.item.id === 'expandall') {
      treegridObj.current.expandAll();
    }
  };

  return (
    <div className="control-pane">
      <div className="control-section">
        <div className="col-md-12">
          <TreeGridComponent
            dataSource={sampleData}
            treeColumnIndex={1}
            childMapping="subtasks"
            allowPaging="true"
            editSettings={editSettings}
            pageSettings={pageSettings}
            toolbar={toolbarOptions}
            contextMenuItems={contextMenuItems}
            contextMenuOpen={contextMenuOpen}
            contextMenuClick={contextMenuClick}
            allowRowDragAndDrop="true"
            allowSorting="true"
            allowExcelExport="true"
            allowPdfExport="true"
            ref={treegridObj}
          >
            <ColumnsDirective>
              <ColumnDirective
                field="taskID"
                headerText="Task ID"
                width="90"
                textAlign="Right"
                validationRules={validationRule}
                isPrimaryKey
              />
              <ColumnDirective
                field="taskName"
                headerText="Task Name"
                width="220"
                validationRules={validationRule}
              />
              <ColumnDirective
                field="startDate"
                headerText="Start Date"
                width="160"
                textAlign="Right"
                editType="datepickeredit"
                format="yMd"
                validationRules={validationRule1}
              />
              <ColumnDirective
                field="duration"
                headerText="Duration"
                width="100"
                editType="numericedit"
                textAlign="Right"
                validationRules={validationRule2}
                edit={editparams2}
              />
            </ColumnsDirective>
            <Inject
              services={[
                Page,
                Edit,
                Toolbar,
                RowDD,
                ContextMenu,
                Sort,
                Resize,
                ExcelExport,
                PdfExport,
              ]}
            />
          </TreeGridComponent>
        </div>
      </div>
    </div>
  );
}
