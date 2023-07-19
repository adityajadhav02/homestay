'use client';

import useSearchModal from "@/app/hooks/useSearchModal";
import dynamic from "next/dynamic";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo, useState } from "react";
import { Range } from "react-date-range";
import CountrySelect, { CountrySelectValue } from "../inputs/CountrySelect";
import Modal from "./Modal";
import qs from 'query-string';
import { formatISO, setDate } from "date-fns";
import Heading from "../Heading";
import Calendar from "../inputs/Calendar";

enum STEPS {
    LOCATION = 0,
    DATE = 1,
    INFO = 2
}

const SearchModal = () => {
    const router = useRouter();
    const params = useSearchParams();
    const searchModal = useSearchModal();

    const [step, setStep] = useState(STEPS.LOCATION);
    const [guestCount, setGuestCount] = useState(1);
    const [roomCount, setRoomCount] = useState(1);
    const [bathroomCount, setBathroomCount] = useState(1);
    const [location, setLocation] = useState<CountrySelectValue>();
    const [dateRange, setDateRange] = useState<Range>({
        startDate: new Date(),
        endDate: new Date(),
        key:'selection'
    });

    const Map = useMemo(() => dynamic(() => import('../Map'), {
        ssr: false,
    }), [location]);

    const onBack = useCallback(() => {
        setStep(step-1);
    }, [])

    const onNext = useCallback(() => {
        setStep(step+1);
    }, [])

    const onSubmit = useCallback(async () =>{
        if(step !== STEPS.INFO) return onNext();

        let currentQuery = {};

        if(params) 
            currentQuery = qs.parse(params.toString());
        
        const updatedQuery: any  = {
            ...currentQuery, 
            locationValue: location?.value,
            guestCount, 
            roomCount,
            bathroomCount, 
        };

        if(dateRange.startDate)
            updatedQuery.startDate = formatISO(dateRange.startDate);

        if(dateRange.endDate)
            updatedQuery.endDate = formatISO(dateRange.endDate);

        const url = qs.stringifyUrl({
            url: '/',
            query: updatedQuery
        }, {skipNull: true});

        setStep(STEPS.LOCATION);
        searchModal.onClose();
        router.push(url);
        
    }, [step, searchModal, location, router, guestCount, roomCount, bathroomCount, dateRange, onNext, params]);

    const actionLabel = useMemo(() => {
        if(step === STEPS.INFO) return 'Search';

        return 'Next';
    }, [step]);

    const secondaryActionLabel = useMemo(() => {
        if(step === STEPS.LOCATION) return undefined;

        return 'Back';
    }, [step]);

    let bodyContent = (
        <div className="flex flex-col gap-8">
            <Heading
                title="Where are you staying?"
                subtitle="Find your location!"
            />
            <CountrySelect 
                value={location}
                onChange={(value) => setLocation(value as CountrySelectValue)}
            />
            <hr />
            <Map center={location?.latlng} />
        </div>
    )

    if(step === STEPS.DATE){
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                    title="When are you planning to go?"
                    subtitle="Select the dates"
                />
                <Calendar 
                    value={dateRange}
                    onChange={(value) => setDateRange(value.selection)}
                />
            </div>
        )
    }

    


  return (
    <Modal 
        isOpen = {searchModal.isOpen}
        onClose = {searchModal.onClose}
        onSubmit = {onSubmit}
        title="Filters"
        actionLabel={actionLabel}
        secondaryAction = {step===STEPS.LOCATION ? undefined : onBack}
        secondaryActionLabel = {secondaryActionLabel}
        body={bodyContent}
    />
  )
}

export default SearchModal