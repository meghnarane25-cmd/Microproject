function RegionFilter({region,setRegion}){

return(

<div className="container text-center mb-4">

<select
className="form-select w-25 mx-auto"
value={region}
onChange={(e)=>setRegion(e.target.value)}
>

<option value="">All Regions</option>
<option>Africa</option>
<option>Asia</option>
<option>Europe</option>
<option>North America</option>
<option>South America</option>
<option>Oceania</option>

</select>

</div>

);

}

export default RegionFilter;