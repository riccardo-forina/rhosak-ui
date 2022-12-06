import { Button } from "@patternfly/react-core";
import { TableVariant } from "@patternfly/react-table";
import type { TableViewProps } from "@rhoas/app-services-ui-components";
import {
  EmptyStateNoResults,
  TableView,
} from "@rhoas/app-services-ui-components";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import type { KafkaTopic, KafkaTopicField } from "../types";
import { formattedRetentionSize, formattedRetentionTime } from "../types";
import type { EmptyStateNoTopicProps } from "./EmptyStateNoTopic";
import { EmptyStateNoTopic } from "./EmptyStateNoTopic";

const Columns: KafkaTopicField[] = [
  "topic_name",
  "partitions",
  "retention_time",
  "retention_size",
];

export type TopicsTableProps<T extends KafkaTopic> = {
  topics: Array<T> | undefined;
  getUrlFortopic: (row: T) => string;
  onDelete: (row: T) => void;
  onEdit: (row: T) => void;
  topicName: string[];
  onSearchTopic: (value: string) => void;
  onRemoveTopicChip: (value: string) => void;
  onRemoveTopicChips: () => void;
  onTopicLinkClick: (row: T) => void;
} & Pick<
  TableViewProps<T, typeof Columns[number]>,
  | "itemCount"
  | "page"
  | "perPage"
  | "onPageChange"
  | "isRowSelected"
  | "isColumnSortable"
  | "onClearAllFilters"
> &
  EmptyStateNoTopicProps;

export const TopicsTable = <T extends KafkaTopic>({
  topics,
  onDelete,
  onEdit,
  isColumnSortable,
  itemCount,
  onSearchTopic,
  topicName,
  onClearAllFilters,
  onCreateTopic,
  page,
  perPage,
  onPageChange,
  onRemoveTopicChip,
  onRemoveTopicChips,
  getUrlFortopic,
  onTopicLinkClick,
}: TopicsTableProps<T>) => {
  const { t } = useTranslation("topic");

  const labels: { [field in KafkaTopicField]: string } = {
    topic_name: t("topic_name"),
    partitions: t("partitions"),
    retention_time: t("retention_time"),
    retention_size: t("retention_size"),
  };

  const isFiltered = topicName.length > 0;
  return (
    <TableView
      variant={TableVariant.compact}
      tableOuiaId={"card-table"}
      ariaLabel={t("topic_list_table")}
      data={topics}
      columns={Columns}
      renderHeader={({ column, Th, key }) => (
        <Th key={key}>{labels[column]}</Th>
      )}
      renderCell={({ column, row, Td, key }) => {
        return (
          <Td key={key} dataLabel={labels[column]}>
            {(() => {
              switch (column) {
                case "topic_name":
                  return (
                    <Button
                      variant="link"
                      component={(props) => (
                        <Link
                          to={getUrlFortopic(row)}
                          {...props}
                          data-testid="tableTopics-linkTopic"
                          data-ouia-component-id="table-link"
                        >
                          {row.topic_name}
                        </Link>
                      )}
                      onClick={() => onTopicLinkClick(row)}
                      isInline
                    />
                  );
                case "partitions":
                  return row.partitions;
                case "retention_time":
                  return formattedRetentionTime(
                    row.retention_time ? parseInt(row.retention_time, 10) : 0
                  );
                case "retention_size":
                  return formattedRetentionSize(
                    row.retention_size ? parseInt(row.retention_size, 10) : 0
                  );
                default:
                  return row[column];
              }
            })()}
          </Td>
        );
      }}
      renderActions={({ row, ActionsColumn }) => (
        <ActionsColumn
          items={[
            {
              title: t("table.actions.edit"),
              onClick: () => onEdit(row),
            },
            {
              title: t("table.actions.delete"),
              onClick: () => onDelete(row),
            },
          ]}
        />
      )}
      isColumnSortable={isColumnSortable}
      filters={{
        [labels.topic_name]: {
          type: "search",
          chips: topicName,
          onSearch: onSearchTopic,
          onRemoveChip: onRemoveTopicChip,
          onRemoveGroup: onRemoveTopicChips,
          validate: (value: string) => !/["$^<>|+%/;:,\s*=~#()]/.test(value),
          errorMessage: t("input_field_invalid_message"),
        },
      }}
      actions={[
        {
          label: t("create_topic"),
          onClick: onCreateTopic,
          isPrimary: true,
        },
      ]}
      itemCount={itemCount}
      page={page}
      onPageChange={onPageChange}
      perPage={perPage}
      isFiltered={isFiltered}
      onClearAllFilters={onClearAllFilters}
      emptyStateNoData={<EmptyStateNoTopic onCreateTopic={onCreateTopic} />}
      emptyStateNoResults={<EmptyStateNoResults />}
    ></TableView>
  );
};