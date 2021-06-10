import React from "react";
import styled from "styled-components";
import { BareProps as Props } from "@polkadot/react-components/types";
import { Table as SUITable } from "semantic-ui-react";

interface TableCellProps extends Props {
  cellData: Array<string>;
  type: string;
}

function TableCellFactory({ className = "", cellData, type }: TableCellProps): React.ReactElement<TableCellProps> {
  const renderCell = (type: string): React.ReactElement<TableCellProps> => {
    if (type === "farm") {
      const [image, head, ...rest] = cellData;
      return (
        <SUITable.Cell className={`${className} farm__tablecell`}>
          <div className="farm__tablecell__image">
            <img width="35px" height="35px" src={image} />
          </div>
          <div>
            {rest.map((item, i) => {
              return i < rest.length - 1 ? (
                <p className="farm__tablecell__text" key={i}>
                  {item}
                </p>
              ) : (
                <a key={i} href={item}>
                  {"Details"}
                </a>
              );
            })}
          </div>
        </SUITable.Cell>
      );
    } else if (type == "yield") {
      {
        const [image, yieldAmount, coinType, unit, points] = cellData;
        return (
          <SUITable.Cell className={className}>
            <p className="farm__tablecell__text">
              {yieldAmount} {coinType} per {unit}
            </p>
          </SUITable.Cell>
        );
      }
    } else if (type === "ROI") {
      const [oneY, oneM, oneD] = cellData;
      return (
        <SUITable.Cell className={className}>
          <p className="farm__tablecell__text">
            {oneY} <span className="farm__tablecell__roiunit ">/year</span>
          </p>
          <p className="farm__tablecell__text">
            {oneM} <span className="farm__tablecell__roiunit ">/month</span>
          </p>
          <p className="farm__tablecell__text">
            {oneD} <span className="farm__tablecell__roiunit ">/day</span>
          </p>
        </SUITable.Cell>
      );
    }
    const [val, tok1, tok1Amt, tok2, tok2Amt] = cellData;
    return (
      <SUITable.Cell className={className}>
        <p className="farm__tablecell__text">{val} </p>
        <p className="farm__tablecell__text">
          {tok1Amt} <span className="farm__tablecell__roiunit ">{tok1}</span>
        </p>
        <p className="farm__tablecell__text">
          {tok2Amt} <span className="farm__tablecell__roiunit ">{tok2}</span>
        </p>
      </SUITable.Cell>
    );
  };

  return renderCell(type);
}

export default React.memo(styled(TableCellFactory)`
  .table-cell-head {
  }

  .farm__tablecell__image {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 8px;
  }

  .farm__tablecell-wrapper {
    display: flex !important;
  }

  .table-cell-yield-wrapper {
    display: flex;
  }
  .table-cell-yield-info {
    margin-left: 8px;
  }

  .farm__tablecell__text {
  }

  .farm__tablecell__roiunit {
    margin-left: 4px;
    color: 8px;
  }
`);
