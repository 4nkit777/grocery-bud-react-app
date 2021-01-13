import React from 'react';
import { FaEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';

const List = ({ items, removeItem, editItem }) => {
    return (
        <div>
            {items.map((item) => {
                const { id, title } = item;
                return (
                <article key={id} className='d-flex justify-content-between mb-3'>
                    <p style={{ fontSize: '1.2rem'}}>{title}</p>
                    <div className='d-flex'>
                        <button className='border-0 bg-light edit-btn' onClick={() => editItem(id)}>
                            <FaEdit />
                        </button>
                        <button className='border-0 bg-light delete-btn' onClick={() => removeItem(id)}>
                            <MdDelete />
                        </button>
                    </div>
                </article>);
            })}
        </div>
    );
}

export default List;