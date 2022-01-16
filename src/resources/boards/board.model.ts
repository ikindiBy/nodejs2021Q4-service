// import { v4 as uuid } from 'uuid';
import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";
import { IBoard, IBoardAPI, IColumn } from '../../interfaces';

@Entity()
class Board implements IBoard {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    columns: IColumn[];
}

// class Board implements IBoard {
//   title: string;

//   columns: IColumn[];

//   id: string;

//   constructor({
//     title,
//     columns,
//   }: IBoardAPI) {
//     this.id = uuid();
//     this.title = title;
//     this.columns = columns || [];
//   }
// }

export default Board;
