/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 */

import React from 'react';
import {
  GridComponent,
  ColumnsDirective,
  ColumnDirective,
} from '@syncfusion/ej2-react-grids';
import { orderDetails } from './data';

export default function HomePage() {
  return (
    <div className="material">
      <div className="control-pane">
        <div className="control-section">
          <GridComponent dataSource={orderDetails} height="100%">
            <ColumnsDirective>
              <ColumnDirective
                field="OrderID"
                headerText="Order ID"
                width="120"
                textAlign="Right"
              />
              <ColumnDirective
                field="CustomerName"
                headerText="Customer Name"
                width="150"
              />
              <ColumnDirective
                field="OrderDate"
                headerText="Order Date"
                width="130"
                format="yMd"
                textAlign="Right"
              />
              <ColumnDirective
                field="Freight"
                headerText="Freight"
                width="120"
                format="C2"
                textAlign="Right"
              />
              <ColumnDirective
                field="ShippedDate"
                headerText="Shipped Date"
                width="130"
                format="yMd"
                textAlign="Right"
              />
              <ColumnDirective
                field="ShipCountry"
                headerText="Ship Country"
                width="150"
              />
            </ColumnsDirective>
          </GridComponent>
        </div>
      </div>
    </div>
  );
}
