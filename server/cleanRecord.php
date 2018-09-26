<?php

/**
* pull out ids and convert data to json
*
* @param object|array $record the record to be cleaned (by address so parameter is changed)
* @return object|array the cleaned record (for chaining)
*/
function cleanRecord($record)
{
	if ($record) {
		if (is_array($record)) {
			foreach ($record as $key => $value) {
				$record[$key] = cleanRecord($value);
			}
		} else {
			unset($record->id);
			unset($record->accounts_id);
		}
	}
	return $record;
}
