"use client";

import {
  Table,
  Card,
} from "@heroui/react";

const data = [
  {
    id: 1,
    name: "Atik Hasan",
    amount: 500,
    date: "27 Jun 2026",
  },
  {
    id: 2,
    name: "Rahim",
    amount: 1000,
    date: "26 Jun 2026",
  },
];

export default function FundingTable() {
  return (
    <Card className="p-3">
      <Table aria-label="Funding Table">
        <Table.Header>
          <Table.Column>DONOR</Table.Column>
          <Table.Column>AMOUNT</Table.Column>
          <Table.Column>DATE</Table.Column>
        </Table.Header>

        <Table.Body>
          {data.map((item) => (
            <Table.Row key={item.id}>
              <Table.Cell>{item.name}</Table.Cell>

              <Table.Cell>৳ {item.amount}</Table.Cell>

              <Table.Cell>{item.date}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </Card>
  );
}
