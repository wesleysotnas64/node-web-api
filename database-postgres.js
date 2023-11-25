import { randomUUID } from 'node:crypto';
import { sql } from './db.js';
export class DatabasePostgres{
    #videos = new Map();

    async list () {
        const videos = await sql`select * from videos`;

        return videos;
    }

    async create (video) {
        const videoId = randomUUID();
        const {title, descricao, duration} = video;

        await sql`
            insert into videos (
                id, title, descricao, duration
            ) values (
                ${videoId}, ${title}, ${descricao}, ${duration}
            );
        `;
    }

    async update (id, video) {
        const {title, descricao, duration} = video

        await sql`
            update videos set
            title = ${title},
            descricao = ${descricao},
            duration = ${duration}
            where
            id = ${id};
        `;
    }

    async delete (id) {
        await sql`
            delete from videos where id = ${id};
        `;
    }
}