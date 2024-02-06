import React, {ReactHTML, useEffect, useState} from 'react';
import style from './documentCreator.module.scss'

interface DocumentData {
    title: string;
    content: string;
    date: string;
}

const DocumentCreator = () => {


    return (
        <div>
            <h2>Создание документа</h2>
            <textarea className={style.document_body}></textarea>
            <div className={style.button_block}>
                <button className={style.button_block_element}>Назад</button>
                <button className={style.button_block_element}>Скачать документ</button>
            </div>
        </div>
    );
};

export default DocumentCreator;