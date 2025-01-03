import React,{useState,useEffect}from 'react'
import "./Home.css"
import optionsData from '../Navbar/optionsData'; 
import { ethers } from "ethers" 
import { Blocks} from 'react-loader-spinner';
import { Link } from 'react-router-dom';
const Home = ({ selectedOption }) => {
    const selectedOptionObject = optionsData.find(option => option.value === selectedOption);
    const selectedOptionName = selectedOptionObject ? selectedOptionObject.name : 'Unknown';
    const [blockDetails, setBlockDetails] = useState([]); 
    const [loader, setLoader] = useState(false);
    const [loading, setLoading] = useState(true);
    const [loadingGasPrice, setLoadingGasPrice] = useState(true)
    const [blockNumber, setBlockNumber] = useState(null);
    const [gasPrice, setGasPrice] = useState(0);
    const [fetchblock, setFetchBlock] = useState(0);

    useEffect(() => {
        setLoader(true);
        setLoading(true)
        setLoadingGasPrice(true)
        setBlockDetails([]);
        setFetchBlock(0)
        setBlockNumber();
        setGasPrice(0);
        
        let isMounted = true; 

        const connect = async () => {
            try {
                const provider = new ethers.providers.JsonRpcProvider(selectedOptionObject.rpc);
                const blockNum = await provider.getBlockNumber();
                setBlockNumber(blockNum);
                setLoading(false);
                const gasPricePromise = provider.getGasPrice();
                const blocksPromise = [];
                for (let i = 0; i < 10; i++) {
                    const blockNo = blockNum - i;
                    const cBno = "0x" + blockNo.toString(16);
                    blocksPromise.push(provider.getBlock(cBno));
                }

                const [gasPrice, ...blocksData] = await Promise.all([gasPricePromise, ...blocksPromise]);

                const gasPriceInGwei = gasPrice / 1e9;
                setGasPrice(gasPriceInGwei);
                setLoadingGasPrice(false);
                let fetchedBlocks = [];
                blocksData.forEach((blockData, i) => {
                    const dateFormat = new Date(blockData.timestamp * 1000);
                    fetchedBlocks.push({
                        blockNo: blockNum - i,
                        hash: blockData.hash,
                        transactions: blockData.transactions.length,
                        gasUsed: blockData.gasUsed.toString(),
                        timestamp: formatAMPM(dateFormat)
                    });
                });
                setBlockDetails(fetchedBlocks);
                setFetchBlock(10)
                setLoader(false);
            } catch (error) {
                console.error("Error:", error);
            }
        };


        connect();
        
        return () => {
            isMounted = false; 
        };
    }, [selectedOptionObject]);

    function formatAMPM(dateObj) {
        const isoString = dateObj.toISOString();
        const year = isoString.slice(0, 4);
        const month = isoString.slice(5, 7);
        const day = isoString.slice(8, 10);
        const time = isoString.slice(11, 19);
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const monthStr = months[parseInt(month, 10) - 1];
        const hour = parseInt(time.slice(0, 2), 10);
        const hour12 = hour > 12 ? hour - 12 : hour;
        const amPm = hour >= 12 ? "PM" : "AM";
        const time12h = `${String(hour12).padStart(2, '0')}${time.slice(2, 8)} ${amPm}`;
        return `${monthStr}-${day}-${year} ${time12h} +UTC`;
    }
  return (
    
    <div className="container" style={{ background: "linear-gradient(to bottom, #222, #111)" }}>
    <div className="content">
        <div className='homemain' style={{color:"white",display:"flex"}}>
                  <div class="glassmorphic-card">
                      <h3 class="card-title" style={{ backgroundColor: "transparent", color: "#4FC3A1"}}>
                          Active Network 
                      </h3>
                      <h3 style={{backgroundColor:"transparent"}}>{selectedOptionName}</h3>
                  </div>
                  <div class="glassmorphic-card">
                      <h3 class="card-title" style={{ backgroundColor: "transparent", color: "#4FC3A1" }}>
                          Current Block Number
                      </h3>
                      {loading ? (
                        <div style={{backgroundColor:"transparent", height:"2.5vh"}}>
                              <Blocks
                                  height="30"
                                  width="30"
                                  ariaLabel="blocks-loading"
                                  wrapperStyle={{
                                      mixBlendMode: "lighten",
                                      position: "relative",

                                      transform: "translate(-20%, -30%)",
                                  }}
                                  wrapperClass="blocks-wrapper"

                              />
                          </div>
                      ) : (
                          <h3 style={{ backgroundColor: "transparent" }}>{blockNumber}</h3>
                      )}
                  </div>
                  <div class="glassmorphic-card">
                      <h3 class="card-title" style={{ backgroundColor: "transparent", color: "#4FC3A1" }}>
                          Current Gas Price
                      </h3>
                      {loadingGasPrice ? (
                          <div style={{ backgroundColor: "transparent", height: "2.5vh" }}>
                              <Blocks
                                  height="30"
                                  width="30"
                                  ariaLabel="blocks-loading"
                                  wrapperStyle={{
                                      mixBlendMode: "lighten",
                                      position: "relative",
                                    
                                      transform: "translate(-20%, -30%)", }}
                                  wrapperClass="blocks-wrapper"

                              />
                              
                          </div>
                      ) : (
                          <h3 style={{ backgroundColor: "transparent" }}>{gasPrice} Gwei</h3>
                      )}
                  </div>
              
           
        </div>
        <div>
                 <div style={{color:"white"}}>
                      <h3 style={{ color: "white", marginLeft: "5%", fontSize: "1.5rem", marginBottom: "1%", fontFamily: "Helvetica", marginRight: "1%" }}>Latest Blocks</h3>{fetchblock !== 10 &&<div style={{display:"flex",marginLeft:"3.8%"}}> <h4 style={{ margin: "0.4% 0.4% 0% 1.5%", }}>Fetching Block:</h4><h4 style={{ margin:"0.4% 0% 1.5%",}}>{fetchblock}/10</h4><Blocks
                          visible={loader}
                          height="30"
                          width="30"
                          ariaLabel="blocks-loading"
                          wrapperStyle={{marginLeft:"0.7%"}}
                          wrapperClass="blocks-wrapper"
                    
                      />
                      </div>}
                 </div> 
            <div className="table-wrapper">
                      
                <table className="fl-table">
                         
                    <thead>
                        <tr>
                            <th>Block #</th>
                            <th>Block Hash</th>
                            <th>Number Of Transaction</th>
                            <th>Gas Used</th>
                            <th>Timestamp</th>
                        </tr>
                    </thead>
                    <tbody>
                        {blockDetails.map((block, index) => (
                            <tr key={index}>
                                <td>{block.blockNo}</td>
                                <td><Link to={`/search-block/${block.hash}`} style={{color:"white", textDecoration:"none"}}>{block.hash}</Link></td>
                                <td>{block.transactions}</td>
                                <td>{block.gasUsed}</td>
                                <td>{block.timestamp}</td>
                            </tr>
                        ))}
                    </tbody>
                        
                </table>
                      {loader && (
                          
                              <div className="overlays">
                                  
                              </div>
                         
                      )}
            </div>
        </div>
    </div>
    <div className="body"></div>
</div>

    
  )
}

export default Home