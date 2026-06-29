import {
  Table,
  Chip,
} from "@heroui/react";

export default function FundingTable({ funds }) {

  return (
      <Table>
        <Table.Content aria-label="Funding Table">
          <Table.Header>
            <Table.Column>#</Table.Column>
            <Table.Column>DONOR</Table.Column>
            <Table.Column>EMAIL</Table.Column>
            <Table.Column>AMOUNT</Table.Column>
            <Table.Column>DATE</Table.Column>
            <Table.Column>Status</Table.Column>
            <Table.Column>Transaction ID</Table.Column>
          </Table.Header>

          <Table.Body>
            {funds.map((fund, index) => (
              <Table.Row key={index}>
                <Table.Cell>{index + 1}</Table.Cell>
                <Table.Cell>{fund?.userName}</Table.Cell>
                <Table.Cell>{fund?.UserEmail}</Table.Cell>

                <Table.Cell>৳ {fund?.amount}</Table.Cell>

                <Table.Cell>
                  {new Date(fund?.createdAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </Table.Cell>
                <Table.Cell>
                  <Chip color="success">Success</Chip>
                </Table.Cell>
                <Table.Cell>{fund?.paymentIntent}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Content>
      </Table>
  );
}
