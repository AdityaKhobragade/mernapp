import React, { useEffect, useState } from 'react';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import Cards from '../components/Cards';

export default function Home() {
    const [ search, setSearch ] = useState( '' );
    const [ foodCat, setFoodCat ] = useState( [] );
    const [ foodItem, setFoodItem ] = useState( [] );

    const loadData = async () => {
        try {
            let response = await fetch( "http://localhost:5000/api/foodData", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                }
            } );
            response = await response.json();

            setFoodItem( response[ 0 ] );
            setFoodCat( response[ 1 ] );
        } catch ( error ) {
            console.error( 'Error fetching data:', error );
        }
    };

    useEffect( () => {
        loadData();
    }, [] );

    return (
        <div>
            <div><NavBar /></div>
            <div><div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel" style={ { objectFit: "contain" } }>
                <div className="carousel-inner">
                    <div className="carousel-caption d-none d-md-block" style={ { zIndex: "10" } }>
                        <div className="d-flex justify-content-center">
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={ search } onChange={ ( e ) => { setSearch( e.target.value ) } } />
                            {/* <button className="btn btn-outline-success text-white bg-success" type="submit">Search</button> */ }
                        </div>
                    </div>
                    <div className="carousel-item active">
                        <img src="https://source.unsplash.com/random/1200x500/?food" className="d-block w-100" style={ { filte: "brightness(10%)" } } alt="..." />
                    </div>
                    <div className="carousel-item">
                        <img src="https://source.unsplash.com/random/1200x500/?pizza" className="d-block w-100" style={ { filte: "brightness(10%)" } } alt="..." />
                    </div>
                    <div className="carousel-item">
                        <img src="https://source.unsplash.com/random/1200x500/?momos" className="d-block w-100" style={ { filte: "brightness(10%)" } } alt="..." />
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
            </div>

            <div className='container'>
                { foodCat.length > 0 ? (
                    foodCat.map( ( data ) => {
                        return (
                            <div className='row mb-3'>
                                <div key={ data._id } className='fs-3 m-3'>{ data.CategoryName }</div>
                                <hr />
                                { foodItem.length > 0 ? (
                                    foodItem
                                        .filter( ( item ) => ( item.CategoryName === data.CategoryName ) && ( item.name.toLowerCase().includes( search.toLocaleLowerCase() ) ) )
                                        .map( ( filterItems ) => {
                                            return (
                                                <div key={ filterItems._id } className='col-12 col-md-6 col-lg-4'>
                                                    <Cards foodName={ filterItems.name }
                                                        options={ filterItems.options[ 0 ] }
                                                        imgSrc={ filterItems.img } >
                                                    </Cards>
                                                </div>
                                            )
                                        } )
                                ) : (
                                    <div>No such data found</div>
                                ) }
                            </div> )
                    } )
                ) : (
                    <div>No such data found</div>
                ) }
            </div>
            <div><Footer /></div>
        </div>
    );
}
