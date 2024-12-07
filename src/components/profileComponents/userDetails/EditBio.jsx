import React from 'react'
import { PulseLoader } from 'react-spinners'

const EditBio = ({ setEditBioOption, info, handleChange, name, max, handleUpdateInfos, loading, placeholder, detail, setShow, relation }) => {
  return (
    <div >
      <div className='mt-2 mb-1'>
        {relation ?
          <select
            onChange={handleChange} value={info?.relationShip} name={name}
            class="block w-full p-2 font-gilroyNormal border border-title_color rounded-md shadow-sm outline-none"
          >
            <option value='Select A relationship Status'>Select relationship Status</option>
            <option value='Single'>Single</option>
            <option value='In A Relationship'>In A Relationship</option>
            <option value="It's Complicated">It's Complicated</option>
            <option value='Married'>Married</option>
            <option value='Divorced'>Divorced</option>
          </select>

          :

          <textarea onChange={handleChange} value={info?.[name]} name={name} maxLength={30} placeholder={placeholder} className='w-full h-24 shadow-sm outline-none resize-none p-1 border rounded-md border-title_color box-border font-gilroyNormal text-sm text-secondary_color' />
        }
      </div>
      {!detail &&
        <div className='mb-2 font-gilroyMedium text-xs text-right text-title_color'>{`${max} character remaining`}</div>
      }
      <div className=' mb-3 flex items-center justify-end gap-x-2'>
        <button
          onClick={() => !detail ? setEditBioOption(false) : setShow(false)} className='font-gilroySemiBold text-black px-3 py-1.5 bg-input_color rounded-md'>Cancle</button>
        <button disabled={loading}
          onClick={() => {
            handleUpdateInfos()
            setShow(false)
          }} className='font-gilroySemiBold text-white px-3 py-1.5 bg-blue rounded-md'>{loading ? <PulseLoader size={5} color='#fff' /> : "Save"}</button>
      </div>
    </div>
  )
}

export default EditBio