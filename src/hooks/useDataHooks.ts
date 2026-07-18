import { useState, useEffect } from 'react'
import {
  mockDestinations,
  mockCourses,
  mockTests,
} from '../data/mockData'
import type {
  Destination,
  Course,
  TestPrep,
} from '../data/mockData'

export function useDestinations() {
  const [destinations, setDestinations] = useState<Destination[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate API delay
    const timer = setTimeout(() => {
      setDestinations(mockDestinations)
      setLoading(false)
    }, 200)
    return () => clearTimeout(timer)
  }, [])

  return { destinations, loading }
}

export function useDestination(id: string | undefined) {
  const [destination, setDestination] = useState<Destination | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!id) {
      setLoading(false)
      return
    }
    const timer = setTimeout(() => {
      const match = mockDestinations.find((d) => d.id === id) || null
      setDestination(match)
      setLoading(false)
    }, 200)
    return () => clearTimeout(timer)
  }, [id])

  return { destination, loading }
}

export function useCourses() {
  const [courses, setCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setCourses(mockCourses)
      setLoading(false)
    }, 200)
    return () => clearTimeout(timer)
  }, [])

  return { courses, loading }
}

export function useTests() {
  const [tests, setTests] = useState<TestPrep[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setTests(mockTests)
      setLoading(false)
    }, 200)
    return () => clearTimeout(timer)
  }, [])

  return { tests, loading }
}

export function useTest(id: string | undefined) {
  const [test, setTest] = useState<TestPrep | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!id) {
      setLoading(false)
      return
    }
    const timer = setTimeout(() => {
      const match = mockTests.find((t) => t.id === id) || null
      setTest(match)
      setLoading(false)
    }, 200)
    return () => clearTimeout(timer)
  }, [id])

  return { test, loading }
}
