import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store';
import { getAddress } from '../../services/apiGeocoding';
import { isGeoError } from '../../utils/helpers';

type UserSliceState = {
  userName: string;
  status: 'idle' | 'loading' | 'fulfilled';
  position: { latitude: number; longitude: number };
  address: string;
  error: string;
};

function getPosition(): Promise<
  GeolocationPosition | GeolocationPositionError
> {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}

export const fetchAddress = createAsyncThunk<
  {
    position: { latitude: number; longitude: number };
    address: string;
  },
  null,
  {
    rejectValue: string;
  }
>('user/fetchAddress', async (_, { rejectWithValue }) => {
  const positionObj = await getPosition();

  if (isGeoError(positionObj)) {
    return rejectWithValue(positionObj.message);
  }

  const position = {
    latitude: positionObj.coords.latitude,
    longitude: positionObj.coords.longitude,
  };

  // Then we use a reverse geocoding API to get a description of the user's address,
  // so we can display it the order form, so that the user can correct it if wrong.
  try {
    throw new Error();
    const addressObj = await getAddress(position);
    const address = `${addressObj.locality}, ${addressObj.city} ${addressObj.postcode}, ${addressObj.countryName}`;

    // Then we return an object with the data that we are interested in.
    // Payload of the FULFILLED state
    return { position, address };
  } catch (e) {
    return rejectWithValue('Address fetch error!');
  }
});

const initialState: UserSliceState = {
  userName: 'Vladislav',
  status: 'idle',
  position: { latitude: 0, longitude: 0 },
  address: '',
  error: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUser: (state, action: PayloadAction<string>) => {
      state.userName = action.payload;
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(fetchAddress.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAddress.fulfilled, (state, action) => {
        state.status = 'fulfilled';
        state.address = action.payload.address;
        state.position = action.payload.position;
      })
      .addCase(fetchAddress.rejected, (state, action) => {
        console.log('Rejected action: ', action);
        state.status = 'fulfilled';
        state.error = action.payload as string;
      }),
});

export const { updateUser } = userSlice.actions;

export const getUsername = (state: RootState) => state.user.userName;

export default userSlice.reducer;
