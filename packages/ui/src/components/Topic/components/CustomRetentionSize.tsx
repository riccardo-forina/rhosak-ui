import type { NumberInputProps, SelectProps } from "@patternfly/react-core";
import {
  Flex,
  FlexItem,
  NumberInput,
  Select,
  SelectOption,
  SelectVariant,
} from "@patternfly/react-core";
import type React from "react";
import type { Topic } from "ui-models/src/models/topic";
import { RetentionSizeUnits } from "../../KafkaTopics/types";
import type { SelectOptions } from "./types";

export type CustomRetentionSizeProps = NumberInputProps &
  SelectProps & {
    id?: string;
    selectOptions: SelectOptions[];
    topicData: Topic;
    setTopicData: (data: Topic) => void;
  };

const CustomRetentionSize: React.FC<CustomRetentionSizeProps> = ({
  onToggle,
  isOpen,
  selectOptions,
  topicData,
  setTopicData,
}) => {
  const onSelect: SelectProps["onSelect"] = (event, value) => {
    // setTopicData({
    //   ...topicData,
    //   customRetentionSizeUnit: value as RetentionSizeUnits,
    // });

    //}

    onToggle(false, event);
  };

  const handleTouchSpin = (operator: string) => {
    if (operator === "+") {
      // setTopicData({
      //   ...topicData,
      //   retentionBytes: topicData.retentionBytes + 1,
      // });
    } else if (operator === "-") {
      // setTopicData({
      //   ...topicData,
      //   retentionBytes: topicData.retentionBytes - 1,
      // });
    }
  };

  const onChangeTouchSpin = (event: React.FormEvent<HTMLInputElement>) => {
    // setTopicData({
    //   ...topicData,
    //   retentionBytes: Number(event.currentTarget.value),
    // });
  };

  return (
    <div className="kafka-ui--radio__parameters">
      <Flex>
        <FlexItem>
          <NumberInput
            onMinus={() => handleTouchSpin("-")}
            onPlus={() => handleTouchSpin("+")}
            value={
              Number(
                topicData["retention.bytes"].value
              ) /* TODO precision loss from BigInt to Number */
            }
            onChange={(event) => onChangeTouchSpin(event)}
            min={0}
          />
        </FlexItem>
        <FlexItem>
          <Select
            variant={SelectVariant.single}
            aria-label="Select Input"
            onToggle={onToggle}
            onSelect={onSelect}
            selections={RetentionSizeUnits.BYTE /* TODO */}
            isOpen={isOpen}
          >
            {selectOptions?.map((s) => (
              <SelectOption
                key={s.key}
                value={s.value}
                isPlaceholder={s.isPlaceholder}
              />
            ))}
          </Select>
        </FlexItem>
      </Flex>
    </div>
  );
};

export { CustomRetentionSize };
