import { Button, ButtonGroup } from "react-bootstrap"
import { useAppDispatch, useAppSelector } from "../app/hooks";

import { actions as filterActions } from "../features/filter";
import { Status } from "../types/Status";

export const Filter = () => {
  const dispatch = useAppDispatch();
  const status = useAppSelector(state => state.filter);

  const statuses: Status[] = ["all", "active", "completed"]

  const setSatusHandler = (statusValue: Status) => {
    dispatch(filterActions.setStatus(statusValue));
  }

  return (
    <ButtonGroup className="mb-3">
      {
        statuses.map(statusValue => (
          <Button
            variant="secondary"
            onClick={() => setSatusHandler(statusValue)}
            active={status === statusValue}
            key={statusValue}
          >
            {statusValue[0].toUpperCase() + statusValue.slice(1)}
          </Button>
        ))
      }
    </ButtonGroup>
  )
}