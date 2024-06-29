import React,{useEffect,useState} from 'react'

const DataTable = () => {
    let [list,setList] = useState([]);
    let [page,setPage] = useState(0);
    let[limit,setLimit] = useState(5)
    let [total,setTotal]  = useState(0)
    let [isPaginated,setIsPaginated] = useState(true)
    let [arry,setArry] = useState([])
    useEffect(() => {
        let fetchData = async () => {
            let data = await fetch("https://restcountries.com/v3.1/all")
            let response = await data.json()
            setList(response)
            setTotal(response.length)
        }
        fetchData()     
    }, [])

    useEffect(() => {
        setArry(list.slice(page,page+limit))
    },[page,list])


   let  sortArea = () => {
        let data = arry.sort((a,b) => {
            return   b.area - a.area
            })
        console.log(arry,data);
        setArry(data)
   }
    
  return (
    <div className='data-table'>
        <div className='search-select'>
            <div>show 5 entries</div>
            <div>
                <input type="text" />
            </div>
        </div>
      <table>
        <thead className="fixed">
            <tr>
                <th></th>
                <th>Area <button onClick={sortArea}>^</button></th>
                <th>population</th>
                <th>continents</th>
                <th>region</th>
                <th>startOfWeek</th>
            </tr>
        </thead>
        <tbody className='table-body'>
            {
            isPaginated ?   (arry?.map((item,index) => (
                    <tr key={index}>
                        <td>{index+1}</td>
                      <td>{item?.area}</td>
                      <td>{item?.population}</td>
                      <td>{item?.continents[0]}</td>
                      <td>{item?.region}</td>
                      <td>{item?.startOfWeek}</td>
                     </tr>
                ))) :(list?.map((item,index) => (
                    <tr key={index}>
                    <td>{index+1}</td>
                      <td>{item?.area}</td>
                      <td>{item?.population}</td>
                      <td>{item?.continents[0]}</td>
                      <td>{item?.region}</td>
                      <td>{item?.startOfWeek}</td>
                     </tr>
                )))
            }
        </tbody>
      </table>
      <div className='pagination'>
          {  Array(total).fill().map((item,index) => (
            <button key={index} onClick={() => setPage(index)}>{index+1}</button>
          ))
            }
      </div>
    </div>
  )
}

export default DataTable


