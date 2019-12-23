const styles = theme => ({
    main: {
      width: 'auto',
      display: 'block', // Fix IE 11 issue.
    },
    dashboardHead: {
      width: '100%',
      fontSize: 27,
      textDecoration: 'none',
      fontWeight: 'bolder',
      textAlign: 'center'
    },
    dashboardFunction: {
        marginTop: theme.spacing.unit * 2,
        marginBottom: theme.spacing.unit * 2,
        width: '100%',
        display: 'flex',
        justifyContent: 'space-around',
        flexWrap: 'wrap'
    },
    form: {
        marginTop: theme.spacing.unit * 1,
        marginBottom: theme.spacing.unit * 1,
    },
    searchKeyword: {
        marginTop: theme.spacing.unit * 1,
        marginBottom: theme.spacing.unit * 1,
    },
    loader: {
        width: '200px',
        display: 'block',
        margin: 'auto',
        marginTop: theme.spacing.unit * 2,
        marginBottom: theme.spacing.unit * 2,
    },
    submit: {
        marginTop: theme.spacing.unit * 1,
        marginLeft: theme.spacing.unit * 1
    },  
    noItems: {
        textAlign: 'center',
        marginTop: theme.spacing.unit * 4,
        fontSize: 20,
        fontWeight: 'bolder'
    },
    profileLink: {
        fontWeight: '900',
        float: 'right',
        color: '#fff',
        textDecoration: 'none'
    }
  });
  
  export default styles;