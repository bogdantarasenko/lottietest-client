import 'isomorphic-unfetch';
import '@testing-library/jest-dom';
import nock from 'nock';
import axios from 'axios';
import dotenv from 'dotenv';
import httpAdapter from 'axios/lib/adapters/http';

dotenv.config({ path: '.env.test' });

axios.defaults.adapter = httpAdapter;

afterAll(() => {
  nock.cleanAll();
  nock.restore();
});

window.scroll = jest.fn();
window.alert = jest.fn();
