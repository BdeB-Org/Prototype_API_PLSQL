create or replace package body test_client_api is

   -- generated by utPLSQL for SQL Developer on 2024-11-03 18:49:01

   --
   -- test ins_client
   --
   procedure ins_client is
      l_actual   integer := 0;
      l_expected integer := 1;
   begin
      -- arrange

      -- act
      -- client_api.ins_client;

      -- assert
      ut.expect(l_actual).to_equal(l_expected);
   end ins_client;

   --
   -- test upd_client
   --
   procedure upd_client is
      l_actual   integer := 0;
      l_expected integer := 1;
   begin
      -- arrange

      -- act
      -- client_api.upd_client;

      -- assert
      ut.expect(l_actual).to_equal(l_expected);
   end upd_client;

   --
   -- test del_client
   --
   procedure del_client is
      l_actual   integer := 0;
      l_expected integer := 1;
   begin
      -- arrange

      -- act
      -- client_api.del_client;

      -- assert
      ut.expect(l_actual).to_equal(l_expected);
   end del_client;

   --
   -- test get_client
   --
   procedure get_client is
      l_actual   integer := 0;
      l_expected integer := 1;
   begin
      -- arrange

      -- act
      -- client_api.get_client;

      -- assert
      ut.expect(l_actual).to_equal(l_expected);
   end get_client;

end test_client_api;