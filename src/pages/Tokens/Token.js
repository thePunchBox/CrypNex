import React, { useState, useEffect } from 'react';
import './Token.css';
import { allTableData, options, updateTime } from '../../service/tokens';

const Token = () => {

    const [sortBy, setSortBy] = useState('price');
    const [sortOrder, setSortOrder] = useState('desc');

    const sortData = (criteria) => {
        const newSortOrder = sortBy === criteria && sortOrder === 'asc' ? 'desc' : 'asc';
        setSortBy(criteria);
        setSortOrder(newSortOrder);

        const sortedData = [...allTableData].sort((a, b) => {
            const aValue = a[criteria];
            const bValue = b[criteria];

            if (newSortOrder === 'asc') {
                return aValue.localeCompare(bValue);
            } else {
                return bValue.localeCompare(aValue);
            }
        });

        setFilteredTableData(sortedData);
    };


    // Filter the table data based on the selected option
    const [selectedOption, setSelectedOption] = useState(options[0]);
    const [updateOption, setUpdateOption] = useState(updateTime[1])
    const [isOpen, setIsOpen] = useState(false);
    const [handleOpen, setHandleOpen] = useState(false);

    const [filteredTableData, setFilteredTableData] = useState(allTableData);


    const handleCryptoOpen = () => {
        setIsOpen(!isOpen);
        setHandleOpen(false);
    }

    const handleUpdateOpen = () => {
        setHandleOpen(!handleOpen);
        setIsOpen(false);
    }
    useEffect(() => {
        console.log('Current selected option: ', selectedOption); // Debugging line
        const filteredData = allTableData.filter((data) =>
            data.label === selectedOption.label

        );

        setFilteredTableData(filteredData);
    }, [selectedOption]);


    return (
        <React.Fragment>
            <div className='token-wrapper'>
                <div className='token-container'>
                    <div className='token-title-wrapper'>
                        <div className='token-title'>
                            <p>Top tokens on Uniswap</p>
                        </div>
                    </div>

                    <div className='filter-wrapper'>
                        <div className='filter-dropdowns'>
                            <div className='crypto-currency-drop'>

                                {/* token-btn */}
                                <button id='crypto-btn ' className='me-2' onClick={handleCryptoOpen}>
                                    <div className='crypto-btn-content'>
                                        <div className='text-and-img'>
                                            <img src={selectedOption.imgSrc} alt='selected-crypto-icon' />
                                            {selectedOption.label}
                                        </div>
                                        <span className={`icon-drop ${isOpen ? 'rotated' : ''}`}>
                                            <i className="ri-arrow-down-s-line"></i>
                                        </span>
                                    </div>
                                </button>


                                {/* token-btn dropdown */}
                                {isOpen && <ul className='dropdown-items-wrapper'>
                                    {options.map((option) => (
                                        <li id='dropdownItem' className='dropdown-item'>
                                            <div className='item-crypto' onClick={() => {
                                                setSelectedOption(option);
                                                setIsOpen(false);
                                            }}>
                                                <img src={option.imgSrc} />
                                                {option.label}
                                            </div>
                                            <div className=''>
                                                {selectedOption.value === option.value && <i className="tick-icon ri-check-line"></i>}
                                            </div>
                                        </li>
                                    ))}

                                </ul>
                                }

                                {/* token update button */}
                                <div className='token-update'>
                                    <button id='updateBtn' className='update-btn' onClick={handleUpdateOpen}>
                                        <div className='token-update-text'>
                                            {updateOption.label}
                                            <span className={`icon-drop ${handleOpen ? 'rotated' : ''}`}>
                                                <i className="ri-arrow-down-s-line"></i>
                                            </span>
                                        </div>
                                    </button>

                                    {/* //token update button dropdown */}
                                    {handleOpen && <ul className='igfebL'>
                                        {updateTime.map((op) => (
                                            <li id='' className='chstga iCcgEc'>
                                                <div className='' onClick={() => {
                                                    setUpdateOption(op);
                                                    setHandleOpen(false);
                                                }}>
                                                    {op.label}
                                                </div>
                                                <div className=''>
                                                    {updateOption.value === op.value && <i className="tick-icon ri-check-line"></i>}
                                                </div>
                                            </li>
                                        ))}

                                    </ul>
                                    }
                                </div>

                            </div>

                            <div id='tokenInputWrapper' className="token-input-wrapper">
                                <div className="">
                                    <input
                                        data-cy="explore-tokens-search-input"
                                        type="search"
                                        placeholder="Filter tokens"
                                        id="searchBar"
                                        autoComplete="off"
                                        className="token-input"
                                        defaultValue=""
                                    />
                                </div>
                            </div>

                        </div>
                    </div>

                    {/* Add the table */}
                    {/* <div className='table-container'>
                    <table className='token-table'>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredTableData.map((row) => (
                                <tr key={row.id}>
                                    <td>{row.id}</td>
                                    <td>{row.name}</td>
                                    <td>{row.price}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div> */}

                    {/* Data Head  */}
                    <div className="sc-19z0ycm-0 frDKYg">
                        <div
                            data-testid="header-row"
                            className="sc-1bit9h6-1 sc-1bit9h6-4 fTDqns giptel"
                        >
                            <div className="sc-1bit9h6-0 sc-1bit9h6-5 hJyIyF bwVaNf">#</div>
                            <div
                                data-testid="name-cell"
                                className="sc-1bit9h6-0 sc-1bit9h6-8 hJyIyF fLXlBW"
                            >
                                Token name
                            </div>
                            <div
                                data-testid="price-cell"
                                className="sc-1bit9h6-0 sc-1bit9h6-6 sc-1bit9h6-9 hJyIyF knzTRi igka-dA"
                            >
                                <span className="sc-1bit9h6-13 jxjqhR">
                                    <div onClick={() => sortData('price')}>Price</div>
                                    {sortBy === 'price' && (
                                        <div className="sc-d5tbhs-1 cSretk">
                                            <div>
                                                <div className="sc-1bit9h6-26 bcYQwk">
                                                    {sortOrder === 'asc' ? (
                                                        <i className="drop-ico ri-arrow-up-line"></i>
                                                    ) : (
                                                        <i className="drop-ico ri-arrow-down-line"></i>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </span>
                            </div>
                            <div
                                data-testid="percent-change-cell"
                                className="sc-1bit9h6-0 sc-1bit9h6-6 sc-1bit9h6-10 hJyIyF knzTRi fLOBMM"
                            >
                                <span className="sc-1bit9h6-13 jxjqhR">
                                    <div onClick={() => sortData('change')}>Change</div>
                                    {sortBy === 'change' && (
                                        <div className="sc-d5tbhs-1 cSretk">
                                            <div>
                                                <div className="sc-1bit9h6-26 bcYQwk">
                                                    {sortOrder === 'asc' ? (
                                                        <i className="drop-ico ri-arrow-up-line"></i>
                                                    ) : (
                                                        <i className="drop-ico ri-arrow-down-line"></i>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </span>
                            </div>
                            <div
                                data-testid="tvl-cell"
                                className="sc-1bit9h6-0 sc-1bit9h6-6 sc-1bit9h6-7 hJyIyF knzTRi fLGPoq"
                            >
                                <span className="sc-1bit9h6-13 jxjqhR">
                                    <div onClick={() => sortData('tvl')}>TVL</div>
                                    {sortBy === 'tvl' && (
                                        <div className="sc-d5tbhs-1 cSretk">
                                            <div>
                                                <div className="sc-1bit9h6-26 bcYQwk">
                                                    {sortOrder === 'asc' ? (
                                                        <i className="drop-ico ri-arrow-up-line"></i>
                                                    ) : (
                                                        <i className="drop-ico ri-arrow-down-line"></i>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </span>
                            </div>
                            <div
                                data-testid="volume-cell"
                                className="sc-1bit9h6-0 sc-1bit9h6-6 sc-1bit9h6-20 hJyIyF knzTRi gEaRbj"
                            >
                                <span className="sc-1bit9h6-13 jxjqhR">
                                    <div onClick={() => sortData('volume')}>Volume</div>
                                    {sortBy === 'volume' && (
                                        <div className="sc-d5tbhs-1 cSretk">
                                            <div>
                                                <div className="sc-1bit9h6-26 bcYQwk">
                                                    {sortOrder === 'asc' ? (
                                                        <i className="drop-ico ri-arrow-up-line"></i>
                                                    ) : (
                                                        <i className="drop-ico ri-arrow-down-line"></i>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </span>
                            </div>
                        </div>





                        {/* Data Body */}
                        <div className="sc-19z0ycm-1 ejgNi">
                            <div>
                                {/* Headers for sorting */}




                            </div>
                            {filteredTableData.map((data, index) => (
                                <div key={index} data-testid="token-table-row-NATIVE">
                                    <a className="sc-1bit9h6-16 kiPA-dv" href={`#/tokens/ethereum/${data.symbol}`}>
                                        <div className="sc-1bit9h6-1 cQmpaP">
                                            <div className="sc-1bit9h6-0 sc-1bit9h6-5 hJyIyF bwVaNf">1</div>
                                            <div data-testid="name-cell" className="sc-1bit9h6-0 sc-1bit9h6-8 hJyIyF fLXlBW">
                                                <div className="sc-1bit9h6-2 sc-1bit9h6-3 bvHTKj jqxpYK">
                                                    <div className="sc-12k1pn4-3 eLvYRk">
                                                        <div className="sc-12k1pn4-2 ckpBIe">
                                                            <img src={data.image} alt="Token logo" className="sc-12k1pn4-1 bwVixy" />
                                                        </div>
                                                        <div className="sc-12k1pn4-4 epsCee" />
                                                    </div>
                                                    <div className="sc-1bit9h6-0 sc-1bit9h6-17 hJyIyF gKCxsP">
                                                        <div data-cy="token-name" className="sc-1bit9h6-18 kSNzln">
                                                            {data.name}
                                                        </div>
                                                        <div className="sc-1bit9h6-0 sc-1bit9h6-19 hJyIyF jRVRlR">
                                                            {data.symbol}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div
                                                data-testid="price-cell"
                                                className="sc-1bit9h6-0 sc-1bit9h6-6 sc-1bit9h6-9 hJyIyF dQscKx igka-dA"
                                            >
                                                <div className="sc-1bit9h6-2 bvHTKj">
                                                    <div className="sc-1bit9h6-0 sc-1bit9h6-12 hJyIyF eNYLXF">
                                                        {data.price}
                                                        <div className="sc-1bit9h6-0 sc-1bit9h6-11 hJyIyF iQNhmM">
                                                            <div className="sc-1nu6e54-7 cLYUzV"></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div
                                                data-testid="percent-change-cell"
                                                className="sc-1bit9h6-0 sc-1bit9h6-6 sc-1bit9h6-10 hJyIyF dQscKx fLOBMM"
                                            >
                                                <div className="sc-1bit9h6-2 bvHTKj">
                                                    <div className="sc-1nu6e54-7 cLYUzV"></div>
                                                    <span className="sc-1nu6e54-2 braSjM">{data.change}</span>
                                                </div>
                                            </div>
                                            <div
                                                data-testid="tvl-cell"
                                                className="sc-1bit9h6-0 sc-1bit9h6-6 sc-1bit9h6-7 hJyIyF dQscKx fLGPoq"
                                            >
                                                <div className="sc-1bit9h6-2 bvHTKj">{data.tvl}</div>
                                            </div>
                                            <div
                                                data-testid="volume-cell"
                                                className="sc-1bit9h6-0 sc-1bit9h6-6 sc-1bit9h6-20 hJyIyF dQscKx gEaRbj"
                                            >
                                                <div className="sc-1bit9h6-2 bvHTKj">{data.volume}</div>
                                            </div>
                                            <div className="sc-1bit9h6-0 sc-1bit9h6-14 hJyIyF NpKpm">
                                                <div className="sc-1bit9h6-0 sc-1bit9h6-15 hJyIyF FLymZ">
                                                    <div style={{ width: '100%', height: '100%' }}>graph-img</div>
                                                </div>
                                            </div>
                                        </div>
                                    </a>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment >
    )
}
export default Token;