'use strict';

const express = require('express');
const cors = require('cors');
const pg = require('pg');
require('dotenv').config();
const axios = require('axios');
const req = require('express/lib/request');

const server = express()
server.use(cors());
server.use(express.json()); //read request body
const PORT = process.env.PORT || 3000;
const client = new pg.Client(process.env.DATABASE_URL)

//routes
//http://localhost:3000
server.get('/', helloWorldHandler);
server.get('/trending', trending);
server.get('/popular', popular);
server.post('/favmovie', addFavMovieHandler)
server.put('/favmovie/:id', updateFavMovieHandler)
server.get('/allfav', allFavHandler)
server.delete('/delfav/:id', deleteFavHandler)
server.get('*', notFoundHandler);
server.use(errorHandler);

function helloWorldHandler(req, res) {
    res.status(200).send('Hello World');
}



function trending(req, res) {
    //send a request to the API:
    const APIKey = process.env.APIKey;
    const url = `https://api.themoviedb.org/3/trending/all/day?api_key=${APIKey}`;
    axios.get(url)
        // res.send(axiosRes.data);
        .then((result) => {
            function trendingMovies(obj) {
                let trending = [];
                for (let i = 0; i < obj.results.length; i++) {
                    trending.push({
                        id: obj.results[i].id,
                        title: obj.results[i].name,
                        release_date: obj.results[i].first_air_date,
                        poster_path: obj.results[i].poster_path,
                        overview: obj.results[i].overview,
                    });
                }
                return trending;
            }
            const movieData = trendingMovies(result.data);
            res.status(200).send(movieData);
        })
        .catch((error) => {
            errorHandler(error, req, res);
        })
};


function popular(req, res) {
    const APIKey = process.env.APIKey;
    const url = `https://api.themoviedb.org/3/movie/popular?api_key=${APIKey}&language=en-US&page=1`;
    axios.get(url)
        .then((result) => {
            function popularMovies(obj) {
                let popular = [];
                for (let i = 0; i < obj.results.length; i++) {
                    popular.push({
                        id: obj.results[i].id,
                        title: obj.results[i].original_title,
                        release_date: obj.results[i].release_date,
                        poster_path: obj.results[i].poster_path,
                        overview: obj.results[i].overview,
                    });
                }
                return popular;
            }
            const movieData = popularMovies(result.data);
            res.status(200).send(movieData);
        })
        .catch((error) => {
            errorHandler(error, req, res);
        })
};

function addFavMovieHandler(req, res) {
    const movie = req.body;
    // console.log(movie);
    const sql = `INSERT INTO movie(title, release_date, poster_path, overview, feedback) VALUES($1, $2, $3, $4, $5) RETURNING *;`;
    const values = [movie.title, movie.release_date, movie.poster_path, movie.overview, movie.feedback];
    client.query(sql, values)
        .then((result) => {
            res.status(200).send(result.rows);
        })
        .catch((error) => {
            errorHandler(error, req, res);
        })
};

function updateFavMovieHandler(req, res) {
    const id = req.params.id;
    const newFeedback = req.body;
    const sql = `UPDATE movie SET title=$1, release_date=$2, poster_path=$3, overview=$4, feedback=$5 WHERE id=${id} RETURNING *;`;
    const values = [newFeedback.title, newFeedback.release_date, newFeedback.poster_path, newFeedback.overview, newFeedback.feedback];

    client.query(sql, values)
        .then((result) => {
            const sql = `SELECT * FROM movie;`;
            client.query(sql)
                .then((result) => {
                    res.status(200).send(result.rows);
                })
                .catch((error) => {
                    errorHandler(error, req, res);
                })
        })
        .catch((error) => {
            errorHandler(error, req, res);
        })
}

function allFavHandler(req, res) {
    const sql = `SELECT * FROM movie;`;
    client.query(sql)
        .then((result) => {
            res.status(200).send(result.rows);
        })
        .catch((error) => {
            errorHandler(error, req, res);
        })
}

function deleteFavHandler(req, res) {
    const id = req.params.id;
    const sql = `DELETE FROM movie WHERE id=${id};`;
    client.query(sql)
        .then((result) => {
            const sql = `SELECT * FROM movie;`;
            client.query(sql)
                .then((result) => {
                    res.status(200).send(result.rows);
                })
                .catch((error) => {
                    errorHandler(error, req, res);
                })
        })
        .catch((error) => {
            errorHandler(error, req, res);
        })
}

function notFoundHandler(req, res) {
    res.status(404).send('page not found 404')
};

function errorHandler(error, req, res) {
    const err = {
        status: 500,
        message: error
    }
    response.status(500).send(err.message)
}

client.connect()
    .then(() => {
        server.listen(PORT, () => {
            console.log(`Returning from ${PORT}`)
        });
    })
