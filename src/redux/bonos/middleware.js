/** @format */

import { GET, GET_SUCCESS, GET_ERROR, GENERAR, GENERAR_SUCCESS, GENERAR_ERROR, UPDATE, UPDATE_ERROR, UPDATE_SUCCESS } from "./actions";

import { bonosFetch, generarBonosFetch } from "../fetchs";

import { apiAction, apiRequest, apiUpdate } from "../api/actions";

export const get = ({ dispatch }) => (next) => (action) => {
    next(action);
    if (action.type === GET) {
        dispatch(apiRequest(bonosFetch, action.options, GET_SUCCESS, GET_ERROR));
    }
};
export const update = ({ dispatch }) => (next) => (action) => {
    next(action);
    if (action.type === UPDATE) {
        dispatch(apiUpdate(bonosFetch, action.entity, UPDATE_SUCCESS, UPDATE_ERROR));
    }
};

export const generar = ({ dispatch }) => (next) => (action) => {
    next(action);
    if (action.type === GENERAR) {
        dispatch(apiAction(generarBonosFetch, action.body, null, null, GENERAR_SUCCESS, GENERAR_ERROR));
    }
};

export const processGet = ({ dispatch }) => (next) => (action) => {
    next(action);
    if (action.type === GET_SUCCESS) {
    }
};

export const processGenerar = ({ dispatch }) => (next) => (action) => {
    next(action);
    if (action.type === GENERAR_SUCCESS) {
    }
};

export const processError = ({ dispatch }) => (next) => (action) => {
    next(action);
    if (action.type === GET_ERROR) {
    }
};
export const generarError = ({ dispatch }) => (next) => (action) => {
    next(action);
    if (action.type === GENERAR_ERROR) {
    }
};

export const updateError = ({ dispatch }) => (next) => (action) => {
    next(action);
    if (action.type === UPDATE_ERROR) {
    }
};
export const updateSuccess = ({ dispatch }) => (next) => (action) => {
    next(action);
    if (action.type === UPDATE_SUCCESS) {
    }
};

export const middleware = [get, processGet, processError, generar, processGenerar, generarError, update, updateSuccess, updateError];
