'use client';
import React, { useEffect, useState } from 'react';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';

import styles from './Content.module.css';
import { Product } from '../../../Types/types';
import Products from '../Products/Products'
import { IoAddOutline } from 'react-icons/io5'
import { RiDeleteBinLine } from "react-icons/ri";
import Snackbar from '../Snackbar/Snackbar';
import { ScrollSyncPane } from 'react-scroll-sync';


interface ItemsListProps {
  productList: Product[];
  setProductList: React.Dispatch<React.SetStateAction<Product[]>>
}

const Content = ({ productList, setProductList }: ItemsListProps) => {

  const [isSnackBarOpen, setIsSnackBarOpen] = useState(false);
  const [message, setMessage] = useState("");

  const handleColumnDelete = (index: number) => {
    setProductList((prevProducts) =>
      prevProducts.map(product => ({
        ...product,
        product_variants: product.product_variants.filter((variant, i) => i !== index)
      })));
    setMessage("Column Deleted successfully");
  }

  const handleRowAdd = () => {
    const productVariantsCount = productList.length > 0 ? productList[0].product_variants.length : 1;
    const newVariants: { image: string; caption: string; }[] = Array.from({ length: productVariantsCount }, () => ({
      image: "",
      caption: ""
    }));

    const newProduct: Product = {
      id: productList.length + 1,
      product_filter: [
        {
          source: "",
          condition: "",
          value: ""
        }
      ],
      product_variants: newVariants
    };

    setProductList((prevProductList) => [...prevProductList, newProduct]);
    setMessage("Row Added successfully");
  };

  useEffect(() => {
    if (message) {
      setIsSnackBarOpen(true);
    }
  }, [message]);

  return (
    <div className={styles.contentDiv}>
      <div className={styles.rowHeading}>
        <div className={styles.itemsIndexDiv}>
        </div>
        <div className={styles.filterHeading}>
          <h3>Product Filter</h3>
        </div>

        <ScrollSyncPane>
          <div className={styles.variantHeadingDiv}>
            {productList.length > 0 && productList[0].product_variants.map((item, index) => (
              <div key={index} className={styles.variantHeading}>
                <h3>{index === 0 ? 'Primary Variant' : `Variant ${index + 1}`}</h3>
                <RiDeleteBinLine style={{ cursor: "pointer" }} onClick={() => handleColumnDelete(index)} />
              </div>
            ))}
            <div className={styles.blankSpace}></div>
          </div>
        </ScrollSyncPane>
      </div>

      <SortableContext items={productList.map(product => product.id)} strategy={verticalListSortingStrategy}>
        {productList.map((item, index) => (
          <React.Fragment key={item.id}>
            <Products index={index} item={item} setProductList={setProductList} />
          </React.Fragment>
        ))}
      </SortableContext>

      <div style={{ margin: "1.5rem" }}>
        <div className={styles.addIcon} onClick={() => handleRowAdd()}>
          <IoAddOutline size={30} />
        </div>
      </div>

      <Snackbar isSnackBarOpen={isSnackBarOpen} setIsSnackBarOpen={setIsSnackBarOpen} Message={message} />

    </div>
  );
};

export default Content;
