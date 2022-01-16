import React, { FC, useEffect, useState } from "react";

import { forwardRef, Text, Tooltip, TooltipProps } from "@chakra-ui/react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(relativeTime);
dayjs.extend(customParseFormat);
dayjs.locale("es");

const ONE_SECOND = 1000;
const ONE_MINUTE = ONE_SECOND * 60;
const ONE_HOUR = ONE_MINUTE * 60;
const ONE_DAY = ONE_HOUR * 24;

const getDelay = (diff: any) => {
  if (diff <= ONE_MINUTE) return ONE_SECOND * 10;
  if (diff <= ONE_HOUR) return ONE_MINUTE;
  if (diff <= ONE_DAY) return ONE_MINUTE * 15;
  return ONE_HOUR;
};

export const DateFormat = forwardRef(function DateFormat({ date = new Date(), format }, ref): JSX.Element{
  const [, setForceUpdate] = useState(0);
  const dayjsDate = dayjs(date);
  useEffect(() => {
    if (date) {
      const diff = dayjs().diff(dayjs(date));

      const timeout = setTimeout(() => {
        setForceUpdate((x) => x + 1);
      }, getDelay(diff));
      return () => clearTimeout(timeout);
    }
  }, [date]);

  return (
    <Tooltip ref={ref} label={dayjsDate.format(format ?? "DD/MM/YYYY")} placement="top-start" bg='gray.300' color='black' hasArrow>
      <Text>{dayjsDate.fromNow() || dayjsDate.format(format ?? "DD/MM/YYYY")}</Text>
    </Tooltip>
  );
});
