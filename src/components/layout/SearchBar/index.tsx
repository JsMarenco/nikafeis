import React, { useEffect, useState } from "react"

import axios from "axios"

import IUserFound from "../interfaces/IUserFound"

import BaseUserCard from "../Cards/BaseUserCard"
import { USER_ROUTE } from "../../contants"

import {
  TextField, Autocomplete, CircularProgress
} from "@mui/material"

function sleep(delay = 0) {
  return new Promise((resolve) => {
    setTimeout(resolve, delay)
  })
}

export default function SearchBar() {
  const [open, setOpen] = useState(false)
  const [options, setOptions] = useState<IUserFound[]>([])
  const loading = open && options.length === 0

  useEffect(() => {
    let active = true

    if (!loading) {
      return undefined
    }

    (async () => {
      await sleep(1e3) // For demo purposes.

      if (active) {
        setOptions([...options])
      }
    })()

    return () => {
      active = false
    }
  }, [loading])

  useEffect(() => {
    if (!open) {
      setOptions([])
    } else {
      axios.get(USER_ROUTE)
        .then((res) => {
          setOptions(res.data)
        })
        .catch((err) => {
          console.log(err)

          setOptions([])
          setOpen(false)
        })

    }
  }, [open])

  return (
    <Autocomplete
      sx={{
        width: "350px",
        flexShrink: 0,
        // responsive 
        "@media (max-width: 600px)": {
          width: "100%",
        }
      }}

      open={open}

      onOpen={() => setOpen(true)}

      onClose={() => setOpen(false)}

      isOptionEqualToValue={(option: IUserFound, value: IUserFound) => {
        return option.name === value.name || option.lastName === value.lastName
      }}

      getOptionLabel={(option) => option.name}

      renderOption={(props, option: IUserFound) => {
        return (
          <>
            <BaseUserCard
              id={option.id}
              name={option.name}
              lastName={option.lastName}
              avatar={option.avatar}
              username={option.username}
            />
          </>
        )
      }}

      options={options}

      loading={loading}

      renderInput={(params) => (
        <TextField
          {...params}

          placeholder="Search people in Nikaafeis"
          variant="standard"

          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {loading ? <CircularProgress color="inherit" size={20} /> : null}
              </>
            ),
          }}
        />
      )}
    />
  )
}