--
--    Copyright 2010-2016 the original author or authors.
--
--    Licensed under the Apache License, Version 2.0 (the "License");
--    you may not use this file except in compliance with the License.
--    You may obtain a copy of the License at
--
--       http://www.apache.org/licenses/LICENSE-2.0
--
--    Unless required by applicable law or agreed to in writing, software
--    distributed under the License is distributed on an "AS IS" BASIS,
--    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
--    See the License for the specific language governing permissions and
--    limitations under the License.
--

-- // initial node
-- Migration SQL that makes the change goes here.

CREATE TABLE nodes (
	id INT NOT NULL AUTO_INCREMENT,
	location VARCHAR(500) NOT NULL,
	guid VARCHAR(500) NOT NULL,
	accounts_id INT,
	discovered_date timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY (id),
	FOREIGN KEY (accounts_id) REFERENCES accounts (id)
);

INSERT INTO nodes (location, accounts_id, guid) VALUES ('•', null, '•');

-- //@UNDO
-- SQL to undo the change goes here.


DROP TABLE nodes;
