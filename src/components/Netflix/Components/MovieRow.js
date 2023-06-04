import React, { useState } from 'react';
import './MovieRow.css';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

const MovieRow = ({ title, items }) => {
    const [scrollX, setScrollX] = useState(-300)

    const handleLeftArrow = () => {
        let x = scrollX + Math.round(window.innerWidth / 2);
        if (x > 0) {
            x = 0;
        }
        setScrollX(x);
    }

    const handleRightArrow = () => {
        let x = scrollX - Math.round(window.innerWidth / 2);
        let minX = -items.results.length * 150 - 100 + window.innerWidth;
        if (x < minX) {
            x = minX
        }
        setScrollX(x);
    }

    return (
        <div className='movieRow'>
            <h2>{title}</h2>

            <div className="movieRow--left" onClick={handleLeftArrow}>
                <NavigateBeforeIcon style={{ fontSize: 50 }} />
            </div>

            <div className="movieRow--right" onClick={handleRightArrow}>
                <NavigateNextIcon style={{ fontSize: 50 }} />
            </div>

            <div className="movieRow--listarea">
                <div className="movieRow--list"
                    style={{
                        marginLeft: scrollX,
                        width: items.results.length * 150
                    }}>

                    {items.results.length > 0 && items.results.map((item, key) => {
                        let imgSrc = `https://image.tmdb.org/t/p/w300${item.poster_path}`;
                        return (
                            <div key={key} className="movieRow--item">
                                <img key={key} src={imgSrc} title={item.original_name} alt={item.original_name} />
                            </div>
                        )
                    })}
                </div>


            </div>
        </div>
    )
}

export default MovieRow;

