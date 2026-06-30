import { Table, Chip } from "@heroui/react";

export default function FundingTable({ funds }) {
  return (
    <div className="w-full">
      <div className="hidden w-full overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm sm:block">
        <Table aria-label="Funding Table" className="min-w-[900px]">
          <Table.Content>
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
              {funds?.map((fund, index) => (
                <Table.Row key={index}>
                  <Table.Cell className="whitespace-nowrap text-sm font-medium text-gray-700">
                    {index + 1}
                  </Table.Cell>
                  <Table.Cell className="min-w-[140px] break-words">
                    {fund?.userName || "—"}
                  </Table.Cell>
                  <Table.Cell className="min-w-[220px] break-all">
                    {fund?.UserEmail || "—"}
                  </Table.Cell>
                  <Table.Cell className="whitespace-nowrap font-semibold text-gray-800">
                    ৳ {fund?.amount}
                  </Table.Cell>
                  <Table.Cell className="whitespace-nowrap">
                    {new Date(fund?.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </Table.Cell>
                  <Table.Cell className="whitespace-nowrap">
                    <Chip color="success" size="sm" variant="flat">
                      Success
                    </Chip>
                  </Table.Cell>
                  <Table.Cell className="min-w-[220px] break-all">
                    {fund?.paymentIntent || "—"}
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Content>
        </Table>
      </div>

      <div className="space-y-3 sm:hidden">
        {funds?.length ? (
          funds.map((fund, index) => (
            <div key={index} className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
              <div className="mb-3 flex items-center justify-between">
                <span className="text-sm font-semibold text-gray-700">#{index + 1}</span>
                <Chip color="success" size="sm" variant="flat">
                  Success
                </Chip>
              </div>

              <div className="space-y-2 text-sm text-gray-600">
                <div>
                  <span className="font-medium text-gray-700">Donor:</span>{" "}
                  {fund?.userName || "—"}
                </div>
                <div>
                  <span className="font-medium text-gray-700">Email:</span>{" "}
                  {fund?.UserEmail || "—"}
                </div>
                <div>
                  <span className="font-medium text-gray-700">Amount:</span>{" "}
                  ৳ {fund?.amount}
                </div>
                <div>
                  <span className="font-medium text-gray-700">Date:</span>{" "}
                  {new Date(fund?.createdAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </div>
                <div>
                  <span className="font-medium text-gray-700">Transaction ID:</span>{" "}
                  {fund?.paymentIntent || "—"}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="rounded-xl border border-dashed border-gray-300 bg-gray-50 p-6 text-center text-sm text-gray-500">
            No funding history yet.
          </div>
        )}
      </div>
    </div>
  );
}
