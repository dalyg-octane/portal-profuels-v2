import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const JsonToSelect = ({ data, label, func }) => {
    
    var currentYear = new Date().getFullYear()
    const classes = useStyles();
    const [dataSel, setData] = React.useState('');

    const handleChange = (event) => {
        setData(event.target.value);
    };

    return (
        <div id={`div${label}`}>
            <FormControl className={classes.formControl}>
                <InputLabel htmlFor={`sel${label}`}>{label}</InputLabel>
                <Select
                    native
                    value={dataSel}
                    onChange={(e) => {
                        handleChange(e);
                        if(func) {
                        func(`sel${label}`);
                        }
                    }}
                    inputProps={{
                        name: `${label}`,
                        id: `sel${label}`,
                    }}
                >
                    <option aria-label="None" value="" />
                    {data.map(e => {
                        return (
                            <option value={label === 'Mes' ? (new Date(currentYear, e.Id - 1 + 1, 0).toISOString().substring(0, 10)) : e.Id}>{e.Nombre}</option>
                        )
                    })}
                </Select>
            </FormControl>
        </div>
    )
}
const useStyles = makeStyles((theme) => ({
    formControl: {
        minWidth: '100%',
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

export default JsonToSelect
