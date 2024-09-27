import { Product } from '../Types/types';

const ProductsList: Product[] =[
    {
      "id": 1,
      "product_filter": [
        {
          "source": "Product Collection1",
          "condition": "contains1",
          "value": "Anarkali suits1"
        },
        {
          "source": "Product Collection1",
          "condition": "contains1",
          "value": "Anarkali suits1"
        },
      ],
      "product_variants": [
        {
          "image": "/images/dress7.jpeg",
          "caption": "Aniug8"
        },
        {
          "image": "/images/dress8.jpeg",
          "caption": "Anniversary Sale scsd sf fg dre"
        }
      ]
    },
    {
      "id": 2,
      "product_filter": [
        {
          "source": "Product Collection2",
          "condition": "contains2",
          "value": "Anarkali suits2"
        },
      ],
      "product_variants": [
        {
          "image": "/images/dress7.jpeg",
          "caption": "Anniversary Sale scsd sf fg dre"
        },
        {
          "image": "/images/dress5.jpeg",
          "caption": "Anniv6780"
        }
      ]
    },
    {
      "id": 3,
      "product_filter": [
        {
          "source": "Product Collection3",
          "condition": "contains3",
          "value": "Anarkali suits3"
        },
        {
          "source": "Product Collection3",
          "condition": "contains3",
          "value": "Anarkali suits3"
        },
      ],
      "product_variants": [
        {
          "image": "/images/suit.jpeg",
          "caption": "Anarkali suits"
        },
        {
          "image": "/images/dress1.jpeg",
          "caption": "Anniversary Sale scsd sf fg dre"
        }
      ]
    }
  ]
  
  export default ProductsList;
