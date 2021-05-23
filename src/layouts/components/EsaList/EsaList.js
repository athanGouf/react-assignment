import React from 'react';
import { Grid, List, ListItem, ListItemText, makeStyles } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { Portlet, PortletContent, PortletHeader, PortletLabel, PortletToolbar } from '..';
import PropTypes from 'prop-types';

const styles = theme => ({
  fullHeight: { height: '100%' },
  header: {
    padding: theme.spacing(0, 1, 0, 2),
    background: theme.palette.default.dark,
    color: theme.palette.default.contrastText
  },
  portletContent: {
    height: 0,
    minHeight: 400,
    display: 'flex',
    flexDirection: 'column'
  }
});

const useStyles = makeStyles(styles);

const EsaList = ({ list, selectedOptions, setSelect, title }) => {
  const classes = useStyles();

  const handleSelect = value => {
    const currentIndex = selectedOptions.findIndex(option => value.id === option.id);
    const newSelectedOptions = [...selectedOptions];
    if (currentIndex === -1) {
      newSelectedOptions.push(value);
    } else {
      newSelectedOptions.splice(currentIndex, 1);
    }
    setSelect(newSelectedOptions);
  };

  const isSelected = value => selectedOptions.some(option => value.id === option.id);

  return (
    <Grid item xs={10}>
      <Portlet>
        <PortletHeader className={classes.header}>
          <PortletLabel title={title} />
          <PortletToolbar>
            <MoreVertIcon />
          </PortletToolbar>
        </PortletHeader>
        <PortletContent className={classes.portletContent} noPadding>
          <List>
            {list.map(option => (
              <ListItem
                key={option.name}
                className={classes.listItem}
                selected={isSelected(option)}
                onClick={() => handleSelect(option)}
              >
                <ListItemText primary={option.name} />
              </ListItem>
            ))}
          </List>
        </PortletContent>
      </Portlet>
    </Grid>
  );
};

EsaList.propTypes = {
  list: PropTypes.array,
  setSelect: PropTypes.func,
  selectedOptions: PropTypes.array,
  title: PropTypes.string
};

export default EsaList;
