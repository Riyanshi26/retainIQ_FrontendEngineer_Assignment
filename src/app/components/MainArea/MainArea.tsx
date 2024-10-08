'use client';
import React, { useState } from 'react';
import styles from './mainarea.module.css';

import { MdOutlineArrowBack } from "react-icons/md";
import Content from '../Content/Content';
import ProductList from '../../../Data/product';
import { arrayMove } from '@dnd-kit/sortable';
import { DndContext, closestCorners, useSensors, useSensor, PointerSensor, DragEndEvent } from "@dnd-kit/core";
import { Product } from '../../../Types/types';
import {ScrollSync} from 'react-scroll-sync'

const MainArea = () => {
    const [productList, setProductList] = useState<Product[]>(ProductList);

    const getProductPos = (id: number) => productList.findIndex((product) => product.id === id);

    const sensors = useSensors(
        useSensor(PointerSensor, {
          activationConstraint: {
            distance: 8,
          },
        })
      )

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;

        if (!over || active.id === over.id) return;

        setProductList((products) => {
            const originalPos = getProductPos(Number(active.id));
            const newPos = getProductPos(Number(over.id));

            return arrayMove(products, originalPos, newPos);
        });
    };

    return (
        <div className={styles.mainarea}>
            <div className={styles.header}>
                <div className={styles.inputDiv}>
                    <div className={styles.icon}>
                        <MdOutlineArrowBack size={30} />
                    </div>
                    <div className={styles.heading}>
                        <h1>RetainIQ Dashboard</h1>
                    </div>
                </div>
                <button className={styles.btn}>
                    Publish Feed
                </button>
            </div>
            <ScrollSync>
            <div className={styles.mainContent}>
                <DndContext onDragEnd={handleDragEnd} collisionDetection={closestCorners} sensors={sensors}>
                    <Content productList={productList} setProductList={setProductList}/>
                </DndContext>
            </div>
            </ScrollSync>

        </div>
    );
};

export default MainArea;
