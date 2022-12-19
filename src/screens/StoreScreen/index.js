import React from 'react'
import { connect } from 'react-redux'
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux'
import { listProducts } from '../../redux/products/productActions';

import { Card, Col, Container, Pagination, Row, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import QueryBox from '../../components/QueryBox';

import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import { SvgIcon } from '@mui/material';


export const StoreScreen = ({ totalProducts, totalPages, products, loadingProducts }) => {
    const search = useLocation().search;
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [actualPage, setActualPage] = React.useState(new URLSearchParams(search).get('page') || 1);
    const [numberPages, setNumberPages] = React.useState([]);
    const [searchText, setSearchText] = React.useState("");
    const [category, setCategory] = React.useState("");
    const [order, setOrder] = React.useState("");


    React.useEffect(() => {
        dispatch(listProducts(actualPage, category, searchText, order))
        if (products) {
            setNumberPages([...Array(totalPages).keys()].map((i) => i + 1));
        }
    }, [actualPage])

    React.useEffect(() => {
        let pagesArray = [];
        for (let index = 0; index < totalPages; index++) {
            pagesArray.push(index + 1);
        }
        setNumberPages(pagesArray);
    }, [totalPages])

    const handleChangePage = (pageNumber) => {
        if (pageNumber > 0 && pageNumber <= totalPages) {
            navigate(`?page=${pageNumber}`);
            setActualPage(pageNumber);
        }
    }

    const handleSearchText = (value) => {
        setSearchText(value);
        dispatch(listProducts(actualPage, category, value, order));
        if (products) {
            setNumberPages([...Array(totalPages).keys()].map((i) => i + 1));
        }
    }

    const handleOrder = (value) => {
        setOrder(value);
        dispatch(listProducts(actualPage, category, searchText, value));
    }

    const handleCategory = (value) => {
        if (value === 'Categoría') {
            setCategory("");
            dispatch(listProducts(1, "", searchText, order))
        } else {
            setCategory(value);
            dispatch(listProducts(1, value, searchText, order))
        }
    }


    return (
        <>
            <Container fluid="md">
                <Row className='border'>
                    <Col xs={12} className="px-0 bg-gradient d-flex align-items-center" style={{ height: "30vh" }}>
                        <div className="mx-md-5 fs-2 fw-bold text-white ">
                            {"Tienda " + process.env.REACT_APP_STORE_NAME}
                        </div>
                    </Col>
                    <Col xs={12}>
                        <QueryBox
                            onSearchText={(value) => handleSearchText(value)}
                            onChangeCategory={(value) => handleCategory(value)}
                            onChangeOrder={(value) => handleOrder(value)}
                        />
                    </Col>
                    {
                        loadingProducts ? (
                            <Row className='justify-content-center py-5'>
                                <Spinner animation="grow" variant="dark" size="xxl" />
                            </Row>
                        ) : (
                            totalProducts ? (
                                products.map((product) => (
                                    <Col sm={12} md={6} lg={3} className='mt-3 h-100' key={`card${product.id}`}>
                                        <Card className='text-center py-3'>
                                            <Card.Title>
                                                {product.name}
                                            </Card.Title>
                                            <img src={product.image_field} alt="" />
                                            <Card.Text>
                                                {product.SKU}
                                            </Card.Text>
                                            <Card.Text>
                                                $ {product.price}
                                            </Card.Text>
                                            <Row className='justify-content-center'>
                                                <Col>
                                                    <Link className='btn btn-primary' to={`store/${product.SKU}`}>
                                                        Ver producto
                                                    </Link>
                                                </Col>
                                            </Row>
                                        </Card>
                                    </Col>
                                ))
                            ) : (
                                <Row className="justify-content-center  mx-auto mt-3 mb-5">
                                    <Col sm={12} className='d-block text-center'>
                                        <SvgIcon style={{ fontSize: "150px", color: "#a1a1a1" }} component={SentimentVeryDissatisfiedIcon} />
                                    </Col>
                                    <Col sm={12} className='text-center fs-2 text-black-50'>
                                        Tu busqueda no obtuvo resultados
                                    </Col>
                                </Row>
                            )
                        )
                    }
                    {
                        totalProducts && (
                            <Row>
                                <Col sm={12}>
                                    <Pagination className='justify-content-center mt-5' size='lg'>
                                        <Pagination.First disabled={actualPage === 1} onClick={() => handleChangePage(1)} />
                                        {
                                            loadingProducts ? (
                                                <Pagination.Item>
                                                    <Spinner size='sm' animation="grow" variant="primary" />
                                                </Pagination.Item>
                                            ) : (
                                                <>
                                                    <Pagination.Prev disabled={actualPage === 1} onClick={() => handleChangePage(actualPage - 1)} />
                                                    {
                                                        numberPages.map((page) => <Pagination.Item key={`page${page}`} disabled={page == actualPage} onClick={() => handleChangePage(page)}>{page}</Pagination.Item>)
                                                    }
                                                    <Pagination.Next disabled={actualPage === totalPages} onClick={() => handleChangePage(actualPage + 1)} />
                                                </>
                                            )
                                        }
                                        <Pagination.Last disabled={actualPage === totalPages} onClick={() => handleChangePage(totalPages)} />
                                    </Pagination>
                                </Col>
                            </Row>
                        )
                    }
                </Row>
            </Container>
        </>
    )
}

const mapStateToProps = (state) => ({
    user: state.userReducer.userInfo,
    totalProducts: state.productReducer.products.count,
    totalPages: state.productReducer.products.pages,
    products: state.productReducer.products.results,
    loadingProducts: state.productReducer.loading,
})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(StoreScreen)