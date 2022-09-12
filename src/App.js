import { useState, useEffect } from 'react'
import medCondObj from './dat/ailments'
import axios from 'axios'


const Ailment = ({obj,toggleSelection}) => {
  const btnClass = 'inline-block m-1 px-5 py-1 rounded-full cursor-pointer hover:bg-medium--blue active:bg-main--blue'
  const btnDark = `bg-dark--blue text-white ${btnClass}`
  const btnLight = `bg-white text-black ${btnClass}`
  const btnTheme = (obj.isSelected)?btnDark:btnLight

  //console.log(obj)
  return <span onClick={toggleSelection} className={btnTheme} id={obj.id}>{obj.name}</span>
}

const App =()=> {
  const [ firstName , setFirstName ] = useState('')
  const [ lastName , setLastName ] = useState('')
  const [ birthDay , setBirthDay ] = useState('')
  const [ sex , setSex ] = useState('other')
  const [ contactDetail , setContactDetail ] = useState({})
  const [ physicalAttr , setPhysicalAttr ] = useState({})
  const [ storedObj,setStoredObj ] = useState(medCondObj)

  useEffect(()=> {
    axios.get('https://cryptic-headland-74219.herokuapp.com/api/records').then(response => console.log(response))
  })

  const handleChange = (fn) => {
    return (e) => {
      fn(e.target.value)
    }
  }

  const toggleSelectionOf = (id) => {
    const cond = Object.keys(storedObj).find(a => storedObj[a].id === id)
    storedObj[cond] = {...storedObj[cond], isSelected:!storedObj[cond].isSelected}
    setStoredObj({...storedObj})
    console.log(storedObj)
  }

  const saveRecord = (e) => {
    const medHist = Object.keys(storedObj).filter(e => storedObj[e].isSelected === true)
    const medHistObj = {}
    e.preventDefault()
    const patientInfo = {
      id: Math.floor(Math.random()*99999999),
      firstName: firstName,
      lastName: lastName,
      birthDay: birthDay,
      sex: sex,
      contactDetail: contactDetail,
      physicalAttribute: physicalAttr,
      //Add Doctor's notes here
      medicalHistoryRecord: medHist.map(e => medHistObj[e] = storedObj[e]),
    }

    axios
    .post('https://cryptic-headland-74219.herokuapp.com/api/records', patientInfo)
    .then(response => {
      console.log(response.data)
    })
  }

  return (
    <div className='p-0 flex flex-col lg:flex-row'>
      <div className='app--navigation p-2 w-100 h-0 lg:p-10 w-2/12 h-screen'>

      </div>
      <div className='lg:w-10/12 h-full'>
        <form className='p-2 h-full lg:p-10'>
          <div className='p-0 h-full rounded-xl  bg-light--blue'>
            <div className='scroll-smooth snap-x block whitespace-nowrap overflow-x-scroll h-full'>
              <div className='p-6 snap-always snap-center inline-block w-full align-top' id='formInput'>
                <h2>Bio</h2>
                <div className='flex gap-2 m-2'>
                  <input value={firstName} placeholder="First Name" onChange={handleChange(setFirstName)}/>
                  <input value={lastName} placeholder="Last Name" onChange={handleChange(setLastName)}/>
                  <input type="date" value={birthDay} placeholder="Last Name" onChange={handleChange(setBirthDay)}/>
                  <select name="sex" id="selectSex" defaultValue={sex} onChange={handleChange(setSex)}>
                    <option value="female">Female</option>
                    <option value="male">Male</option>
                    <option value="other">Select Gender</option>
                  </select>
                </div>
                <h2>Contact</h2>
                <div className='flex gap-2 m-2'>
                  <input name = "address" type = "address" placeholder="Mailing Address" onChange={(e) => setContactDetail({...contactDetail, mailAddress: e.target.value})}/>
                </div>
                <div className='flex gap-2 m-2'>
                  <input name="telephone" type="tel" placeholder="Contact Number" onChange={(e) => setContactDetail({...contactDetail, contactNumber: e.target.value})}/>
                  <input name="email" type="email" placeholder="Email" onChange={(e) => setContactDetail({...contactDetail, emailAddress: e.target.value})}/>
                </div>
                <h2>Physical Attributes</h2>
                <div className='flex gap-2 m-2'>
                  <input name="height" type="number" placeholder="Height in cm" onChange={(e) => setPhysicalAttr({...physicalAttr, bodyHeight: e.target.value})}/>
                  <input name="weight" type="number" placeholder="Weight in Kg" onChange={(e) => setPhysicalAttr({...physicalAttr, bodyWeight: e.target.value})}/>
                  <input name="bloodType" type="text" placeholder="Blood Type" onChange={(e) => setPhysicalAttr({...physicalAttr, bloodType: e.target.value})}/>
                </div>
                <div className='flex flex-col gap-2 m-2'>
                  <p><label>Doctor's Notes</label></p>
                  <textarea className="w-full" placeholder="Doctor's notes for physical attributes"></textarea>
                </div>
              </div>
              <div className='p-6 snap-always snap-center inline-block whitespace-normal' id='medicalHistorySelection'>
                <h2>Medical History</h2>
                <div className=''>
                  {Object.keys(storedObj).map((ailment,i) => {
                    return <Ailment obj={storedObj[ailment]} toggleSelection={() => toggleSelectionOf(storedObj[ailment].id)} key={i} />
                  })
                  }
                </div>
              </div>
            </div>
              <div className='p-10 flex gap-4 place-content-end w-full'>
                <a className='bg-main--blue text-white rounded-full px-10 py-2' href="#formInput">Previous</a>
                <a className='bg-main--blue text-white rounded-full px-10 py-2' href="#medicalHistorySelection">Next</a>
                <a className='bg-green text-white rounded-full px-10 py-2' href="#medicalHistorySelection" onClick={saveRecord}>Save to the Cloud</a>
              </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default App;
