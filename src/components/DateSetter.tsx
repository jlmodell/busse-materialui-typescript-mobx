import React from "react";
import moment from 'moment'

import { observer } from "mobx-react";
import { Params } from '../store/mobx';

import { makeStyles } from "@material-ui/core/styles";

import { KeyboardDatePicker } from "@material-ui/pickers";
import { MaterialUiPickersDate } from "@material-ui/pickers/typings/date";

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(4, 4)
    },
    dateContainer: {
        display: "flex",
        justifyContent: "center"
    },
    spacer: {
        margin: "1rem"
    },
    errContainer: {
        display: "flex",
        justifyContent: "center",
        color: "red"
    },
    individual: {
        margin: "0 1rem"
    }
}));

const currentYear = new Date().getFullYear();
const lastMonth = new Date().getMonth();
const maxDate = moment(new Date(currentYear, lastMonth, 0)).toISOString();
const minDate = moment(new Date(2012, 1, 1)).toISOString();

const DateSetter: React.FC = observer(() => {
    const classes = useStyles()
    const params = Params;

    // React.useEffect(() => {
    //     console.log(new Date())
    //     console.log(params.start)
    //     console.log(params.end)
    // }, [params.start, params.end])

    return (
        <div className={classes.root}>
            <div className={classes.dateContainer}>
                <KeyboardDatePicker
                    className={classes.individual}
                    minDate={minDate}
                    maxDate={maxDate}
                    autoOk
                    variant="dialog"
                    inputVariant="filled"
                    label="Start"
                    openTo="date"
                    value={params.start}
                    onChange={(date: MaterialUiPickersDate) => {
                        if (date) {
                            params.setStart(date.toISOString())
                        }
                    }}
                />
                <KeyboardDatePicker
                    className={classes.individual}
                    minDate={minDate}
                    maxDate={maxDate}
                    initialFocusedDate={maxDate}
                    autoOk
                    variant="dialog"
                    inputVariant="filled"
                    label="End"
                    openTo="date"
                    value={params.end}
                    onChange={(date: MaterialUiPickersDate) => {
                        if (date) {
                            params.setEnd(date.toISOString())
                        }
                    }}
                />
            </div>
            <div className={classes.spacer} />
            <div className={classes.errContainer}>
                {params.error}
            </div>
        </div>
    );
})

export default DateSetter