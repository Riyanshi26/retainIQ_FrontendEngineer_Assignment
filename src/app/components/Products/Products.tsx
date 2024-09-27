'use client';
import React, { useEffect, useState } from 'react';
import styles from "./Products.module.css";
import Image from 'next/image';
import { TbGridDots } from "react-icons/tb";
import { Product } from '../../../Types/types';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import ImageSelectionModal from '../ImageSelectionModal/ImageSelectionModal';

import { RiDeleteBinLine } from "react-icons/ri";
import { IoAddOutline } from 'react-icons/io5'
import Snackbar from '../Snackbar/Snackbar';

interface ListItemProps {
    item: Product;
    index: number;
    setProductList: React.Dispatch<React.SetStateAction<Product[]>>
}

const Products = ({ item, index, setProductList }: ListItemProps) => {
    const { attributes, setNodeRef, transform, transition, listeners } = useSortable({ id: item.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };
    const [hoveredProductId, setHoveredProductId] = React.useState<number | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedVariantIndex, setSelectedVariantIndex] = useState<number | null>(null);
    const [isSnackBarOpen, setIsSnackBarOpen] = useState(false);
    const [message, setMessage] = useState("");

    const handleRowDelete = (id: number) => {
        setProductList((prevProducts) => prevProducts.filter(product => product.id !== id));
        setMessage("Row deleted successfully");
    };

    const handleColumnAdd = () => {
        const newVariant = {
            image: "",
            caption: ""
        };

        setProductList((prevProducts) =>
            prevProducts.map(product => ({
                ...product,
                product_variants: [...product.product_variants, newVariant]
            }))
        );
    setMessage("Column added successfully");
    };

    const openModal = (index: number) => {
        setSelectedVariantIndex(index);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedVariantIndex(null);
    };

    const handleImageSelection = (image: string, caption: string) => {
        if (selectedVariantIndex !== null) {
            setProductList((prevProducts) =>
                prevProducts.map(product => {
                    if (product.id === item.id) {
                        return {
                            ...product,
                            product_variants: product.product_variants.map((variant, idx) =>
                                idx === selectedVariantIndex ? { image, caption } : variant
                            ),
                        };
                    }
                    return product;
                })
            );
        }
        closeModal();
    };

    useEffect(() => {
        if (message) {
            setIsSnackBarOpen(true);
        }
      }, [message]);

    return (
        <div className={styles.content} ref={setNodeRef} {...attributes} {...listeners} style={style}
            onMouseEnter={() => setHoveredProductId(item.id)}
            onMouseLeave={() => setHoveredProductId(null)}
        >
            <div className={styles.sno}>
                {hoveredProductId === item.id && (
                    <RiDeleteBinLine
                        className={styles.deleteIcon}
                        size={20}
                        color="red"
                        onClick={() => handleRowDelete(item.id)}
                    />
                )}
                <div style={{ display: "flex", alignItems: "center" }}>
                    <h1>{index + 1}</h1>
                    <TbGridDots size={26} color="black" />
                </div>
            </div>

            <div className={styles.filterContainer}>
                <div className={styles.filterDiv}>
                    {item.product_filter.map((filter, idx) => (
                        <>
                            {filter.condition === "" ? (
                                <div className={styles.insertIconDiv}>
                                    <div className={styles.insertDisplay} >
                                        <IoAddOutline size={20} />
                                        <p>Add Product Filters</p>
                                    </div>
                                </div>
                            ) : (
                                <div className={styles.filter} key={`filter-${idx}`}>
                                    <div className={styles.filterName}>{filter.source}</div>
                                    <div className={styles.filterCondition}>{filter.condition}</div>
                                    <div className={styles.filterName}>{filter.value}</div>

                                    <div className={styles.zoomBox}>
                                        <div className={styles.zoomContainer}>
                                            <div className={styles.zoomedFilter}>
                                                <div className={styles.filterName}>{filter.source}</div>
                                                <div className={styles.filterCondition}>{filter.condition}</div>
                                                <div className={styles.filterName}>{filter.value}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </>
                    ))}
                </div>
            </div>

            <div className={styles.variants}>
                {item.product_variants.map((variant, idx) => (
                    <div className={styles.imageContainer} key={`variant-${idx}`}>
                        <div className={styles.imageDiv}>
                            {variant.image.length === 0 ? (
                                <div className={styles.insertIconDiv}>
                                    <div className={styles.insertDisplay} onClick={() => openModal(idx)}>
                                        <IoAddOutline size={20} />
                                        <p>Add design</p>
                                    </div>
                                </div>
                            ) : (
                                <>
                                    <Image
                                        src={variant.image}
                                        className={styles.img}
                                        alt="suit"
                                        width={110}
                                        height={110}
                                    />
                                    <p className={styles.caption}>{variant.caption}</p>
                                </>
                            )}
                        </div>
                    </div>
                ))}
                <div style={{ margin: "4.5rem" }}>
                    <div className={styles.addIcon}>
                        <IoAddOutline size={30} onClick={handleColumnAdd} />
                    </div>
                </div>
            </div>

            <ImageSelectionModal
                isOpen={isModalOpen}
                onClose={closeModal}
                onSelectImage={handleImageSelection}
                index={selectedVariantIndex}
            />

<Snackbar isSnackBarOpen={isSnackBarOpen} setIsSnackBarOpen={setIsSnackBarOpen} Message={message} />
</div>
    );
};

export default Products;
