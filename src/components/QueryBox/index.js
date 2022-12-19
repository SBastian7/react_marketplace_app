import React from 'react'
import { Col, Row, Form, Dropdown } from 'react-bootstrap'
import { connect, useDispatch } from 'react-redux'

import { useDebounce } from 'use-debounce';
import { listCategories, listProducts } from '../../redux/products/productActions';

export const QueryBox = ({ onSearchText, onChangeCategory, onChangeOrder, categories }) => {
    const [searchText, setSearchText] = React.useState("")
    // const [categories, setCategories] = React.useState([])
    const [lessThanPrice, setLessThanPrice] = React.useState(50000)
    const [greaterThanPrice, setGreaterThanPrice] = React.useState(50000)

    const [value] = useDebounce(searchText, 1300)
    const dispatch = useDispatch();

    const handleSearch = (e) => {
        e.preventDefault();
        setSearchText(e.target.value)
    }

    React.useEffect(() => {
        onSearchText(searchText);    
    }, [value])

    React.useEffect(() => {
        dispatch(listCategories());
        console.log(categories)
    }, [])
    
    

    return (
        <>
            <Row className='justify-content-center mt-5'>
                <Col xs={12} md={8} lg={6} className=''>
                    <input type="text" placeholder='Buscar en la tienda' className='form-control' onChange={(e) => handleSearch(e)} value={searchText} />
                </Col>
            </Row>
            <Row className='justify-content-center mb-4 mt-3'>
                <Col xs={12} md={4} lg={3}>
                    <Form.Select onChange={(e) => onChangeOrder(e.target.value)}>
                        <option value="">Ordenar por</option>
                        <option value="higherPrice">Menor precio</option>
                        <option value="lowerPrice">Mayor precio</option>
                        <option value="nameAsc">Nombre ascendente</option>
                        <option value="nameDesc">Nombre descendente</option>
                    </Form.Select>
                </Col>
                <Col xs={12} md={4} lg={3}>
                    <Form.Select onChange={(e) => onChangeCategory(e.target.value)} >
                        <option>Categoría</option>
                        {
                            categories.map((category) => <option value={category.name} key={category.name}>{category.name}</option>)
                        }
                    </Form.Select>
                </Col>
            </Row>
        </>
    )
}

const mapStateToProps = (state) => ({
    categories: state.categoryReducer.categories,
})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(QueryBox)