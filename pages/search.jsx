import { useRouter } from 'next/dist/client/router'
import React from 'react'
import Footer from '../components/Footer'
import Header from '../components/Header'
import{format}  from 'date-fns'
import InfoCard from '../components/InfoCard'
import Map from '../components/Map'

export default function Search({searchResults}) {
  
  const router = useRouter()
  
  const{ 
    location,
    startDate,
    endDate,
    numbOfGuests } = router.query
    
    const formatedStartDate = format(new Date(startDate), 'dd MMMM yy') 
    const formatedEndDate = format(new Date(endDate), 'dd MMMM yy') 
    const range = `${formatedStartDate} - ${formatedEndDate}`
   
  return (
    <div>
      <Header placeholder={`${location} | ${range} | ${numbOfGuests} guests`} />
        <main className='flex '>
          <section className='flex-grow pt-14 px-6' >
            <p className='text-sm'>300+ Stays -{range}- for {numbOfGuests} guests</p>
            <h1 className='text-3xl font-semibold mt-2 mb-6 '>Stays in {location}</h1>
            
            <div className='hidden lg:inline-flex  
              mb-5 space-x-3 text-gray-800 whitespace-nowrap' >
              <p className='button'>Free cancellation </p>
              <p className='button'>Type of place </p>
              <p className='button'>Price </p>
              <p className='button'>Rooms and Beds</p>
              <p className='button'>More filters</p>
            </div>

            <div className='flex flex-col'>
              {searchResults.map(({img,location,title,description,star,price,total})=>(
                <InfoCard 
                key={img}
                img={img}
                location={location}
                title={title}
                description={description}
                star={star}
                price={price}
                total={total}
                />
              ))}
            </div> 

          </section>
  
          <section className='hidden xl:inline-flex xl:min-w-[600px]'>
            <Map searchResults={searchResults}/>
          </section>
        </main>
      <Footer/>
    </div>
  )
}


export async function getServerSideProps(){

  const searchResults = await fetch('https://links.papareact.com/isz')
    .then(resp=>resp.json())

  
  return{
    props:{
      searchResults
    }
  }

}