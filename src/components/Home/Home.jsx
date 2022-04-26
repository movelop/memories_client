import React, { useState } from 'react';
import { Grow, Container, Grid, Paper, AppBar, TextField, Button} from '@material-ui/core';
import { useLocation, useNavigate } from 'react-router-dom';
import ChipInput from 'material-ui-chip-input';
import Posts from '../Posts/Posts';
import Form from '../Form/Form';
import { useDispatch } from 'react-redux';
import Pagination from '../Pagination';
import { getPostsBySearch } from '../../actions/posts';
import useStyles from './styles'

function useQuery(){
    return new URLSearchParams(useLocation().search);
}

const Home = () => {
    const [currentId, setCurrentId] = useState(0);
    const [search, setSearch] = useState('');
    const [tags, setTags] = useState([]);
    const query = useQuery();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const classes = useStyles();
    const page = query.get('page') || 1;
    const searchQuery = query.get('searchQuery');

    const searchPosts = () => {
        if(search.trim() || tags) {
            dispatch(getPostsBySearch({ search, tags: tags.join(',') }));
            navigate(`/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`);
        } else {
            navigate('/');
        }
    }

    const handleKeyPress = (e) => {
        if(e.keyCode === 13) {
            searchPosts();
        }
    }

    const handleAddChip = (tag) => {
        setTags([...tags, tag]);
    }

    const handleDeleteChip = (chipDelete) => {
        setTags(tags.filter((tag) => tag !== chipDelete));
    }

  return (
    <Grow in>
        <Container maxWidth='xl'>
            <Grid container justifyContent = 'space-between' alignItems ='stretch' spacing = {3} className= {classes.gridContainer}>
                <Grid item xs = {12} sm={6} md = {9}>
                    <Posts setCurrentId = {setCurrentId} />
                </Grid>
                <Grid item xs = {12} sm={6} md = {3}>
                    <AppBar className={classes.appBarSearch} position='static' color='inherit' >
                        <TextField 
                            name='search' 
                            variant='outlined' 
                            label='Search Memories' 
                            fullWidth 
                            value={search} 
                            onChange={(e)=> setSearch(e.target.value)}
                            onKeyDown={handleKeyPress}
                        />
                        <ChipInput 
                            style={{ margin: '10px 0' }}
                            value={tags}
                            onAdd={(chip) => handleAddChip(chip)}
                            onDelete = { (chip) => handleDeleteChip(chip) }
                            label = 'Search Tags'
                            variant='outlined'
                        />
                        <Button onClick={searchPosts} className={classes.searchButton} variant="contained" color="primary">Search</Button>
                    </AppBar>
                    <Form currentId = {currentId} setCurrentId = {setCurrentId} />
                    {(!searchQuery && !tags.length) &&(
                        <Paper className= {classes.pagination} elevation={6}>
                            <Pagination page={page} />
                        </Paper>
                    )}
                </Grid>
            </Grid>
        </Container>
    </Grow>
  )
}

export default Home