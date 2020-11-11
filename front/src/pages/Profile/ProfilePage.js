import { Grid, List, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React, { useEffect, useState } from 'react';
import SkillManager from '../../business/SkillManager';
import SkillsWidget from '../Setup/SkillsWidget';
import SkillForm from './SkillForm';
import SkillItem from './SkillItem';

export default (props) => {
    return <div className="page">
        <SkillsWidget {...props} />
    </div>
}