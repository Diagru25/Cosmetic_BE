export interface IBase {
    create(entity: any);

    update(id: string, entity: any);

    delete(id: string, entity: any);

    getAll(filter: any, page_index: number, page_size: number): Promise<any>;

    getOneById(id: string);

    getOne(filter: any);

    getFilter(filter: any);
}