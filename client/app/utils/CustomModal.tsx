import React, { ComponentType, FC } from 'react'
import { Modal, Box } from '@mui/material'

type ModalComponentProps = {
    setOpen: (open: boolean) => void,
    setRoute?: (route: string) => void,
    refetch?: any
}

type Props = {
    open: boolean,
    setOpen: (open: boolean) => void,
    activeItem: number,
    component: ComponentType<ModalComponentProps>,
    setRoute?: (route: string) => void
    refetch?: any
}

const CustomModal: FC<Props> = ({ open, setOpen, setRoute, component: Component, refetch }) => {
    return (
        <div>
            <Modal
                open={open}
                onClose={() => setOpen(false)}
                aria-labelledby='modal-modal-title'
                aria-describedby='modal-modal-description'
            >
                <Box
                    sx={{
                        msOverflowStyle: 'none',
                        scrollbarWidth: 'none',
                        '&::-webkit-scrollbar': {
                            display: 'none'
                        }
                    }}
                    className='absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[95vw] max-w-112.5 max-h-[90vh] overflow-y-auto bg-white dark:bg-slate-900 rounded-lg shadow p-4 outline-none'
                >
                    <Component setOpen={setOpen} setRoute={setRoute} refetch={refetch} />
                </Box>
            </Modal>
        </div>
    )
}

export default CustomModal