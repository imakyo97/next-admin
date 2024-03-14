/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Programmer } from '../models/Programmer';
import type { ProgrammerData } from '../models/ProgrammerData';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class ProgrammersService {
    /**
     * プログラマー一覧取得API
     * @returns Programmer Successful Response
     * @throws ApiError
     */
    public static getProgrammersProgrammersGet(): CancelablePromise<Array<Programmer>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/programmers/',
        });
    }
    /**
     * プログラマー取得API
     * @returns Programmer Successful Response
     * @throws ApiError
     */
    public static getProgrammerProgrammersProgrammerIdGet({
        programmerId,
    }: {
        programmerId: number,
    }): CancelablePromise<Programmer> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/programmers/{programmer_id}',
            path: {
                'programmer_id': programmerId,
            },
            errors: {
                404: `Not Found`,
                422: `Validation Error`,
            },
        });
    }
    /**
     * プログラマー更新API
     * @returns Programmer Successful Response
     * @throws ApiError
     */
    public static updateProgrammerProgrammersProgrammerIdPut({
        programmerId,
        requestBody,
    }: {
        programmerId: number,
        requestBody: ProgrammerData,
    }): CancelablePromise<Programmer> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/programmers/{programmer_id}',
            path: {
                'programmer_id': programmerId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                404: `Not Found`,
                422: `Validation Error`,
            },
        });
    }
    /**
     * プログラマー削除API
     * @returns Programmer Successful Response
     * @throws ApiError
     */
    public static deleteProgrammerProgrammersProgrammerIdDelete({
        programmerId,
    }: {
        programmerId: number,
    }): CancelablePromise<Programmer> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/programmers/{programmer_id}',
            path: {
                'programmer_id': programmerId,
            },
            errors: {
                404: `Not Found`,
                422: `Validation Error`,
            },
        });
    }
    /**
     * プログラマー作成API
     * @returns Programmer Successful Response
     * @throws ApiError
     */
    public static createProgrammerProgrammersCreatePost({
        requestBody,
    }: {
        requestBody: ProgrammerData,
    }): CancelablePromise<Programmer> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/programmers/create',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
}
