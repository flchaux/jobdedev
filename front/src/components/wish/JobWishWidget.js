import { Grid, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React, { useContext, useEffect, useState } from 'react';
import JobTitleInput from '../../components/common/JobTitleInput';
import WageInput from '../../components/common/WageInput';
import UserContext from '../../UserContext';

export default function JobWishWidget(props) {

    const dev = useContext(UserContext)
    const [jobTitles, setJobTitles] = useState([])

    function getDefaultWage(wage) {
        return {
            value: wage.value ?? 0,
            computing: wage.computing ?? 0,
        }
    }
    function getDefaultJob(currentJobTitles, wage) {
        return {
            jobTitle: currentJobTitles.length > 0 && jobTitles.length > 0 ? jobTitles.find((j) => j.id === currentJobTitles[0]) : '',
            wage: getDefaultWage(wage)
        }
    }

    const [wish, setWish] = useState({
        required: getDefaultJob(dev.JobTitleRequired ?? [],
            {
                value: dev.AnnualWageRequired,
                computing: dev.AnnualWageRequiredComputing
            }),
        optional: getDefaultJob(dev.JobTitleOptional ?? [],
            {
                value: dev.AnnualWageOptional,
                computing: dev.AnnualWageOptionalComputing
            }),
    })

    useEffect(() => {
        props.wishManager.wish = wish
    }, [wish, props.wishManager])

    useEffect(() => {
        props.jobTitleStore.getAll().then((result) => {
            setJobTitles(result)
            setWish(w => {
                if (dev.JobTitleRequired && dev.JobTitleRequired.length > 0) {
                    w.required.jobTitle = result.find((j) => j.id === dev.JobTitleRequired[0])
                }
                if (dev.JobTitleOptional && dev.JobTitleOptional.length > 0) {
                    w.optional.jobTitle = result.find((j) => j.id === dev.JobTitleOptional[0])
                }
                return { ...w }
            })
        });

    }, [props.jobTitleStore, dev])

    const useStyles = makeStyles({
        labelCell: {
            textAlign: 'right',
            verticalAlign: 'center',
            margin: 'auto'
        },
        valueCell: {
            textAlign: 'left',
            verticalAlign: 'center',
        },
    });

    const classes = useStyles();

    return <Grid container spacing={6} alignContent='center' justify='center' style={{ marginBottom: 32 }}>
        <Grid item sm={6} className={classes.labelCell}>
            Je recherche avant tout un poste de
            </Grid>
        <Grid item sm={6} className={classes.valueCell}>
            <JobTitleInput jobTitles={jobTitles} onChange={(event, value) => {
                wish.required.jobTitle = value
                setWish({ ...wish })
            }} value={wish.required.jobTitle} />
        </Grid>
        <Grid item sm={6} className={classes.labelCell}>
            Dans ce cas je souhaite gagner au moins
            </Grid>
        <Grid item sm={6} className={classes.valueCell}>
            <WageInput onChange={(input, wage) => { wish.required.wage = wage }} wage={{ value: dev.AnnualWageRequired, computing: dev.AnnualWageRequiredComputing }} />
        </Grid>
        <Grid item sm={6} className={classes.labelCell}>
            Je recherche avant tout un poste de
            </Grid>
        <Grid item sm={6} className={classes.valueCell}>
            <JobTitleInput jobTitles={jobTitles} onChange={(event, value) => {
                wish.optional.jobTitle = value
                setWish({ ...wish })
            }} value={wish.optional.jobTitle} />
        </Grid>
        <Grid item sm={6} className={classes.labelCell}>
            En gagnant minimum
            </Grid>
        <Grid item sm={6} className={classes.valueCell}>
            <WageInput onChange={(input, wage) => { wish.optional.wage = wage }} wage={{ value: dev.AnnualWageOptional, computing: dev.AnnualWageOptionalComputing }} />
        </Grid>
    </Grid>
}